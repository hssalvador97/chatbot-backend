'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GESTOCAR_T_USUARIO extends Model {

        static associate(models) {}
    };
    GESTOCAR_T_USUARIO.init({
        IDUSUARIO: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        USUARIO: DataTypes.STRING(30),
        PASSWORD: DataTypes.STRING(30),
        ESTATUS: DataTypes.INTEGER,
        IDROL: DataTypes.INTEGER,
        IDSOCKET: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GESTOCAR_T_USUARIO',
        freezeTableName: true
    });
    return GESTOCAR_T_USUARIO;
};