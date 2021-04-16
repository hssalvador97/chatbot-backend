'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GESTOCAR_T_TIPO_MENSAJES extends Model {

        static associate(models) {}
    };
    GESTOCAR_T_TIPO_MENSAJES.init({
        ID_TIPO_MENSAJE: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        TIPO: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GESTOCAR_T_TIPO_MENSAJES',
        freezeTableName: true
    });
    return GESTOCAR_T_TIPO_MENSAJES;
};