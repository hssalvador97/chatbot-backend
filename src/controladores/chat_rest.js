const express = require('express');
const app = express();
const { GESTOCAR_T_USUARIO } = require('../database/models/index');
app.get("/", express.json(), (req, res) => {

    try {
        GESTOCAR_T_USUARIO.findAll().then(async Consultas => {
            res.json({ ok: true, status: 200, consultas: Consultas });
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, status: 500, mensaje: error });
    }
});


app.post("/conversacion", (req, res) => {
    // let uid = req.params.uid;
    let firmas = req.body;
    console.log(firmas);

    try {
        GESTOCAR_T_USUARIO.findAll().then(async Consultas => {
            res.json({ ok: true, status: 200, consultas: Consultas });
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, status: 500, mensaje: error });
    }
});

module.exports = app;