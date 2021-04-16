'use strict';
const { Model } = require('sequelize');
const keys = require('../config/keys');
module.exports = (sequelize, DataTypes) => {
    class GESTOCAR_T_CHAT_MENSAJES extends Model {

        static associate(models) {

            GESTOCAR_T_CHAT_MENSAJES.belongsTo(models.GESTOCAR_T_TIPO_MENSAJES, { as: "GESTOCAR_T_TIPO_MENSAJES", foreignKey: "TIPO_MENSAJE_ID" });
        }
    };
    GESTOCAR_T_CHAT_MENSAJES.init({
        ID_CHAT_MENSAJES: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        MENSAJE: DataTypes.STRING(65535),
        FECHA: DataTypes.DATE,
        RECIBIDO: DataTypes.BOOLEAN,
        URL: DataTypes.STRING(65535),
        USUARIO_ENVIA_ID: DataTypes.INTEGER,
        USUARIO_RECIBE_ID: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'GESTOCAR_T_CHAT_MENSAJES',
        freezeTableName: true
    });
    return GESTOCAR_T_CHAT_MENSAJES;
};