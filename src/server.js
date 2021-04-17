require('./config/config');
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(require('./controladores/indexControlador'));

const { sequelize } = require('./database/models/index');
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./controladores/sockets_chat');


const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


server.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
    sequelize.authenticate().then(() => {
        console.log("Conexion a Mysql");
    }).catch(error => {
        console.log("Error en la conexion de la base de datos", error);
    });
});