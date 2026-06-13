const express = require('express');
const JogoController = require('./controllers/JogoController');
const EmpresaController = require('./controllers/EmpresaController');

const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

app.use(express.json());

