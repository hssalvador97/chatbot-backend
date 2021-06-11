const express = require('express');
const app = express();
const { GESTOCAR_T_USUARIO } = require('../database/models/index');


app.get("/prueba", express.json(), (req, res) => {
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