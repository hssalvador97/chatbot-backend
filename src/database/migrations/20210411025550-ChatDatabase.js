'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        // await queryInterface.createTable('GESTOCAR_T_TIPO_MENSAJES', {
        //     ID_TIPO_MENSAJE: {
        //         allowNull: false,
        //         autoIncrement: true,
        //         primaryKey: true,
        //         type: Sequelize.INTEGER
        //     },
        //     TIPO: {
        //         type: Sequelize.STRING
        //     },
        // });
        await queryInterface.createTable('GESTOCAR_T_CHAT_MENSAJES', {
            ID_CHAT_MENSAJES: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            MENSAJE: {
                type: Sequelize.STRING(65535)
            },
            FECHA: {
                type: Sequelize.DATE
            },
            RECIBIDO: {
                type: Sequelize.BOOLEAN
            },
            URL: {
                type: Sequelize.STRING(65535)
            },
            TIPO_MENSAJE_ID: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'GESTOCAR_T_TIPO_MENSAJES',
                    key: 'ID_TIPO_MENSAJE'
                }
            },

            USUARIO_ENVIA_ID: {
                type: Sequelize.INTEGER,
            },

            USUARIO_RECIBE_ID: {
                type: Sequelize.INTEGER
            },
        });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('GESTOCAR_T_TIPO_MENSAJES');
        await queryInterface.dropTable('GESTOCAR_T_CHAT_MENSAJES');
    }
};