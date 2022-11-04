const express = require('express');
const bodyParser = require('body-parser');
const { readTalker } = require('./utils/fsUtils');
const { generateToken } = require('./utils/functionUtils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;
const UNAUTHORIZED = 401;
/* const CREATED = 201; */
const OK = 200;

app.get('/talker', async (req, res) => {
    const talker = await readTalker();
    if (!talker) {
        return res.status(HTTP_OK_STATUS).json([]);
    } 
    return res.status(HTTP_OK_STATUS).json(talker);
});

app.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talker = await readTalker();
    const response = talker.find((t) => t.id === Number(id));

    if (!response) {
        return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    } 
    return res.status(HTTP_OK_STATUS).json(response);
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if ([email, password].includes(undefined)) {
        return res.status(UNAUTHORIZED).json({ message: 'Campos ausentes!' });
    }
    const token = generateToken();
    return res.status(OK).json({ token });
});

module.exports = app;