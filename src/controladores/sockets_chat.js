const { io } = require('../server');
const moment = require('moment');
const { Op } = require('sequelize');
const { GESTOCAR_T_USUARIO, GESTOCAR_T_CHAT_MENSAJES, GESTOCAR_T_TIPO_MENSAJES } = require('../database/models/index');
io.on('connection', (cliente) => {
    console.log("USUARIO CONECTADO", cliente.id);
    cliente.on('chat:nueva_conexion', async(data) => {
        let id = parseInt(data.id_user);
        let usuario = await GESTOCAR_T_USUARIO.findOne({
            where: { IDUSUARIO: id },
        });
        await usuario.update({
            IDSOCKET: cliente.id,
        });
        let usuarios = [];


        if (usuario.IDROL == 1) {
            usuarios = await GESTOCAR_T_USUARIO.findAll({
                // order: [
                //     // Will escape title and validate DESC against a list of valid direction parameters
                //     ['USUARIO', 'DESC'],
                // ],
                where: {
                    IDROL: {
                        [Op.ne]: 1
                    }
                }
            });
        } else {
            usuarios = await GESTOCAR_T_USUARIO.findAll({
                where: {
                    IDROL: 1
                }
            });
        }


        for (const obj of usuarios) {
            let mensajes = await GESTOCAR_T_CHAT_MENSAJES.findAll({
                where: {
                    USUARIO_ENVIA_ID: obj.IDUSUARIO,
                    USUARIO_RECIBE_ID: usuario.IDUSUARIO,
                    RECIBIDO: 0
                }
            });
            obj.dataValues.Pendientes = mensajes.length;
        }

        io.to(cliente.id).emit('chat:usuariosdisponibles', usuarios);
    });

    cliente.on('chat:select_conversacion', async(data) => {
        try {
            let mensajes = await GESTOCAR_T_CHAT_MENSAJES.findAll({
                where: {
                    [Op.or]: [{ USUARIO_ENVIA_ID: data.user_p, USUARIO_RECIBE_ID: data.user_s }, { USUARIO_ENVIA_ID: data.user_s, USUARIO_RECIBE_ID: data.user_p }]
                }
            });
            for (const obj of mensajes) {
                await obj.update({
                    RECIBIDO: 1
                });
                obj.dataValues.FECHA_T = moment(obj.FECHA).format('DD/MM/YYYY HH:mm');
            }
            io.to(cliente.id).emit('chat:select_conversacion', mensajes);

            let usuario = await GESTOCAR_T_USUARIO.findOne({
                where: { IDUSUARIO: data.user_p },
            });
            let usuarios = [];
            let auxUsuarios = [];


            if (usuario.IDROL == 1) {
                // USUARIO ADMIN. 

                usuarios = await GESTOCAR_T_USUARIO.findAll({
                    // order: [
                    //     ['USUARIO', 'DESC'],
                    // ],
                    where: {
                        IDROL: {
                            [Op.ne]: 1
                        }
                    }
                });

                if (data.filtro == 0) {
                    for (const obj of usuarios) {
                        if (obj.IDSOCKET != null && obj.IDSOCKET != "") {
                            auxUsuarios.push(obj);
                        }
                    }
                    usuarios = auxUsuarios;
                } else if (data.filtro == 2) {
                    for (const obj of usuarios) {
                        let mensajes = await GESTOCAR_T_CHAT_MENSAJES.findAll({
                            where: {
                                [Op.or]: [{ USUARIO_ENVIA_ID: obj.IDUSUARIO, USUARIO_RECIBE_ID: usuario.IDUSUARIO }, { USUARIO_ENVIA_ID: usuario.IDUSUARIO, USUARIO_RECIBE_ID: obj.IDUSUARIO }]
                            }
                        });
                        if (mensajes.length > 0) {
                            auxUsuarios.push(obj);
                        }
                    }

                    usuarios = auxUsuarios;

                }

            } else {
                //TODOS LOS DEMAS USUARIOS.
                usuarios = await GESTOCAR_T_USUARIO.findAll({
                    where: {
                        IDROL: 1
                    }
                });
            }


            for (const obj of usuarios) {
                let mensajes = await GESTOCAR_T_CHAT_MENSAJES.findAll({
                    where: {
                        USUARIO_ENVIA_ID: obj.IDUSUARIO,
                        USUARIO_RECIBE_ID: usuario.IDUSUARIO,
                        RECIBIDO: 0
                    }
                });
                obj.dataValues.Pendientes = mensajes.length;
            }

            io.to(cliente.id).emit('chat:usuariosdisponibles', usuarios);


        } catch (error) {
            console.log(error);
        }
    });


    cliente.on('chat:usuariosdisponibles', async(data) => {
        try {
            let usuario = await GESTOCAR_T_USUARIO.findOne({
                where: { IDUSUARIO: data.user_p },
            });
            let usuarios = [];
            let auxUsuarios = [];


            if (usuario.IDROL == 1) {
                // USUARIO ADMIN. 

                usuarios = await GESTOCAR_T_USUARIO.findAll({
                    where: {
                        // order: [
                        //     ['USUARIO', 'DESC'],
                        // ],
                        IDROL: {
                            [Op.ne]: 1
                        }
                    }
                });

                if (data.filtro == 0) {
                    for (const obj of usuarios) {
                        if (obj.IDSOCKET != null && obj.IDSOCKET != "") {
                            auxUsuarios.push(obj);
                        }
                    }
                    usuarios = auxUsuarios;
                } else if (data.filtro == 2) {
                    for (const obj of usuarios) {
                        let mensajes = await GESTOCAR_T_CHAT_MENSAJES.findAll({
                            where: {
                                [Op.or]: [{ USUARIO_ENVIA_ID: obj.IDUSUARIO, USUARIO_RECIBE_ID: usuario.IDUSUARIO }, { USUARIO_ENVIA_ID: usuario.IDUSUARIO, USUARIO_RECIBE_ID: obj.IDUSUARIO }]
                            }
                        });
                        if (mensajes.length > 0) {
                            auxUsuarios.push(obj);
                        }
                    }

                    usuarios = auxUsuarios;

                }

            } else {
                //TODOS LOS DEMAS USUARIOS.
                usuarios = await GESTOCAR_T_USUARIO.findAll({
                    where: {
                        IDROL: 1
                    }
                });
            }


            for (const obj of usuarios) {
                let mensajes = await GESTOCAR_T_CHAT_MENSAJES.findAll({
                    where: {
                        USUARIO_ENVIA_ID: obj.IDUSUARIO,
                        USUARIO_RECIBE_ID: usuario.IDUSUARIO,
                        RECIBIDO: 0
                    }
                });
                obj.dataValues.Pendientes = mensajes.length;
            }

            io.to(cliente.id).emit('chat:usuariosdisponibles', usuarios);
        } catch (error) {
            console.log(error);
        }
    });



    cliente.on('chat:mensaje', async(data) => {
        let new_mensaje = await GESTOCAR_T_CHAT_MENSAJES.create({
            MENSAJE: data.MENSAJE,
            FECHA: new Date(),
            RECIBIDO: 0,
            URL: "",
            TIPO_MENSAJE_ID: data.TIPO_MENSAJE_ID,
            USUARIO_ENVIA_ID: data.USUARIO_ENVIA_ID,
            USUARIO_RECIBE_ID: data.USUARIO_RECIBE_ID,
        });
        new_mensaje.dataValues.FECHA_T = moment(new_mensaje.FECHA).format('DD/MM/YYYY HH:mm');
        io.to(cliente.id).emit('chat:mensaje', new_mensaje);

        let usuario = await GESTOCAR_T_USUARIO.findOne({
            where: { IDUSUARIO: new_mensaje.USUARIO_RECIBE_ID },
        });

        if (usuario.IDSOCKET != "" && usuario.IDSOCKET != null) {
            // await new_mensaje.update({
            //     RECIBIDO: 1
            // });

            io.to(usuario.IDSOCKET).emit('chat:mensaje', new_mensaje);

            let activo = await GESTOCAR_T_USUARIO.findOne({
                where: { IDUSUARIO: data.USUARIO_RECIBE_ID },
            });

            let activos = [];


            if (activo.IDROL == 1) {
                activos = await GESTOCAR_T_USUARIO.findAll({
                    // order: [
                    //     ['USUARIO', 'DESC'],
                    // ],
                    where: {
                        IDROL: {
                            [Op.ne]: 1
                        }
                    }
                });

            } else {
                activos = await GESTOCAR_T_USUARIO.findAll({
                    where: {
                        IDROL: 1
                    }
                });
            }


            for (const obj of activos) {
                let mensajes = await GESTOCAR_T_CHAT_MENSAJES.findAll({
                    where: {
                        USUARIO_ENVIA_ID: obj.IDUSUARIO,
                        RECIBIDO: 0
                    }
                });
                obj.dataValues.Pendientes = mensajes.length;
            }
            io.to(usuario.IDSOCKET).emit('chat:usuariosdisponibles', activos);

        }

    });
    cliente.on('disconnect', async() => {
        console.log(cliente.id, 'disconnected');
        let usuario = await GESTOCAR_T_USUARIO.findOne({
            where: { IDSOCKET: cliente.id },
        });
        if (usuario != null) {
            await usuario.update({
                IDSOCKET: "",
            });
        }

    });


});