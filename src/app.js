const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

app.get('/', (req, res) => res.status(HTTP_OK_STATUS).json({ message: 'Olá Mundo!' }));

app.get('/talker', (req, res) => res.status(HTTP_OK_STATUS).json(talker));

module.exports = app;