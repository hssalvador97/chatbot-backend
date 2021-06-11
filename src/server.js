require('./config/config');
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const cors = require('cors');
const app = express();
const fs = require('fs');

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(require('./controladores/indexControlador'));

const { sequelize } = require('./database/models/index');

var sslOptions = {
  key: fs.readFileSync(path.resolve('src/key.pem')),
  cert: fs.readFileSync(path.resolve('src/cert.pem'))
};

const server = require('https').createServer(sslOptions, app);

module.exports.io = require('socket.io')(server);

require('./controladores/sockets_chat');


const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


server.listen(process.env.PORT, (err) => {
    console.log(process.env.PORT);
    if (err) throw new Error(err);
    // NUNCA MODIFICAR AQUIIIIIIIIII !!!!!!!!!
    sequelize.authenticate().then(() => {
        console.log("Conexion a Mysql");
    }).catch(error => {
        console.log("Error en la conexion de la base de datos", error);
    });
});
