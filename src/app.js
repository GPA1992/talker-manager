const express = require('express');
const bodyParser = require('body-parser');
const { readTalker, writeNewTalker } = require('./utils/fsUtils');
const { generateToken } = require('./utils/functionUtils');
const { loginValition, 
    tokenValidation,
    nameValidation,
    ageValidation,
    talkValidation,
    talkWatchedAtValidation,
    talkRateValidation,
} = require('./middlewares/validationFunction');

const app = express();
app.use(bodyParser.json());

const NOT_FOUND = 404;
const UNAUTHORIZED = 401;
const CREATED = 201;
const HTTP_OK_STATUS = 200;
const NO_CONTENT = 204;

app.get('/talker/search', tokenValidation, async (req, res) => {
    const talkerSeed = await readTalker();
    const { q } = req.query;
    console.log(q);
    if (!q) {
        return res.status(HTTP_OK_STATUS).json(talkerSeed);
    }
    const findTalker = talkerSeed.find((talker) => talker.name.includes(q));
    if (!findTalker) {
        return res.status(HTTP_OK_STATUS).json([]);
    }
    const searchTalker = talkerSeed.filter((talker) => talker.name.includes(q));
    return res.status(HTTP_OK_STATUS).json(searchTalker);
});

app.get('/talker', async (req, res) => {
    const talkerSeed = await readTalker();
    if (!talkerSeed) {
        return res.status(HTTP_OK_STATUS).json([]);
    } 
    return res.status(HTTP_OK_STATUS).json(talkerSeed);
});

app.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talkerSeed = await readTalker();
    const response = talkerSeed.find((t) => t.id === Number(id));

    if (!response) {
        return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    } 
    return res.status(HTTP_OK_STATUS).json(response);
});

app.post('/login', loginValition, (req, res) => {
    const { email, password } = req.body;

    if ([email, password].includes(undefined)) {
        return res.status(UNAUTHORIZED).json({ message: 'Campos ausentes!' });
    }
    const token = generateToken();
    return res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker',
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
talkWatchedAtValidation,
talkRateValidation, async (req, res) => {
    const talkerSeed = await readTalker();
    const lastIndexOfArray = talkerSeed.length - 1;
    const lastId = talkerSeed[lastIndexOfArray].id;
    const nextId = Number(lastId) + 1;
    const newTalker = { id: nextId, ...req.body };
    talkerSeed.push(newTalker);
    await writeNewTalker(talkerSeed);
    return res.status(CREATED).json(newTalker);
});

app.put('/talker/:id',
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
talkWatchedAtValidation,
talkRateValidation, async (req, res) => {
    const talkerSeed = await readTalker();
    const { id } = req.params;
    const editTalker = { id: Number(id), ...req.body };
    const talkerIndex = talkerSeed.findIndex((talker) => Number(talker.id) === Number(id));
    talkerSeed[talkerIndex] = {
        id: Number(id),
        ...req.body,
    };
    await writeNewTalker(talkerSeed);
    return res.status(HTTP_OK_STATUS).json(editTalker);
});

app.delete('/talker/:id',
tokenValidation, async (req, res) => {
    const talkerSeed = await readTalker();
    const { id } = req.params;
    const talkerIndex = talkerSeed.findIndex((talker) => Number(talker.id) === Number(id));
    talkerSeed.splice(talkerIndex, 1);
    await writeNewTalker(talkerSeed);
    return res.status(NO_CONTENT).end();
});

module.exports = app;