const express = require('express');
const app = express();
const dFlow = require('dialogflow-fulfillment');
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const { configs } = require('./../../dialogflow');


app.post("/", express.json(), (req, res) => {
    const agent = new dFlow.WebhookClient({
        request: req,
        response: res
    });

    function mensaje(agent) {
        agent.add("Gracias, su orden esta en camino");
    }

    let intentMap = new Map();
    intentMap.set('UsuarioPideTamal', mensaje)
    agent.handleRequest(intentMap);
});
module.exports = app;