require('dotenv').config();

module.exports = {
    username: "sisdgmx",
    password: "sisdg",
    database: "gestocar_prod",
    host: "162.214.73.31",
    dialect: "mysql",
    define: {
        timestamps: false,
        undescored: true
    },
    timezone: '-05:00'
}