'use strict';
require('./config/config');
const express = require("express");
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(require('./controladores/indexControlador'));

const { sequelize } = require('./database/models/index');



// const http = require('http');
// let server = http.createServer(app);

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./controladores/sockets_chat');
server.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
    sequelize.authenticate().then(() => {
        console.log("Conexion a Mysql");
    }).catch(error => {
        console.log("Error en la conexion de la base de datos", error);
    });
});



// SOCKETS
// const SocketIO = require("socket.io");

// let ios = SocketIO(server);
// module.exports.io = ios;

// io.on('connection', (socket) => {
//     console.log("USUARIO CONECTADO", socket.id);

//     socket.on('chat:mensaje', (data) => {

//         // ENVIAR A TODOS INCLUYENDOME A MI 
//         io.sockets.emit('chat:nuevomensaje', data);
//         console.log(data);
//     });



// });