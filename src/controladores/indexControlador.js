const express = require('express');
const app = express();
// Lista controladores
app.use(require('./ChatBot'));



module.exports = app;