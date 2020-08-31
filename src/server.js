'use strict';
require('./config/config');
const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(require('./controladores/indexControlador'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const SocketIO = require('socket.io');
const http = require('http');
let server = http.createServer(app);
//IO
let io = SocketIO(server);

server.listen(process.env.PORT, () => console.log(process.env.PORT));
// SOCKETS 
let users = [];
let message = [];

// const dFlow = require('dialogflow-fulfillment');
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const { configs } = require('../dialogflow');
const { Payload } = require('dialogflow-fulfillment');


io.on('connection', (socket) => {
    users["id"] = socket.id;
    console.log("USUARIO CONECTADO");

    socket.emit('mensaje', {
        type: "0",
        mensaje: `Hola,
                Nuestro menu es el siguiente: 
                Tamales de mole, rajas, dulce. ¿Que se te antoja?`
    });

    socket.on('message', (message) => {
        socket.emit('mensaje', {
            type: "1",
            mensaje: message
        });
        try {
            async function runSample(projectId = 'chatbot-emvd') {


                const sessionId = socket.id;


                const sessionClient = new dialogflow.SessionsClient(configs);
                const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
                const request = {
                    session: sessionPath,
                    queryInput: {
                        text: {
                            text: message,
                            languageCode: 'es-MX',
                        },
                    },
                };

                const responses = await sessionClient.detectIntent(request);
                console.log('Detected intent');
                const result = responses[0].queryResult;
                console.log(`  Query: ${result.queryText}`);
                console.log(`  Response: ${result.fulfillmentText}`);

                socket.emit('mensaje', {
                    type: 0,
                    mensaje: result.fulfillmentText
                });

                if (result.intent) {
                    console.log(`  Intent: ${result.intent.displayName}`);
                } else {
                    console.log(`  No intent matched.`);
                }

            }

            runSample();
        } catch (err) {
            next(err);
        }


    });
    socket.on('disconnect', function() {
        const auxUser = [];
        users.forEach(id => {
            if (id != socket.id) {
                auxUser.push(id);
            }
        })
        users = auxUser;

        console.log("USUARIO DESCONECTADO");
    });
});