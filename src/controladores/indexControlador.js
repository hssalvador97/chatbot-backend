const express = require('express');
const app = express();
// Lista controladores
app.use(require('./chat_rest'));



module.exports = app;