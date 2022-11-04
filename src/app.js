const express = require('express');
const bodyParser = require('body-parser');
const { readTalker } = require('./utils/fsUtils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

app.get('/talker', async (req, res) => {
    const talker = await readTalker();
    if (!talker) {
        return res.status(HTTP_OK_STATUS).json([]);
    } 
    return res.status(HTTP_OK_STATUS).json(talker);
});

module.exports = app;