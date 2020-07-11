const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
});

module.exports = connection;