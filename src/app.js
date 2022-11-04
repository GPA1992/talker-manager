const express = require('express');
const bodyParser = require('body-parser');
const { readTalker } = require('./utils/fsUtils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;

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

module.exports = app;