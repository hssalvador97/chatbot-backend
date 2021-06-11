require('dotenv').config();

module.exports = {
    username: "sisdgmx",
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    define: {
        timestamps: false,
        undescored: true
    },
    timezone: '-05:00'
}