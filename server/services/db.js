const mysql = require('mysql2');
const dotEnv = require('dotenv').config();

const config = {
	connectionLimit: 5,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
};

module.exports = mysql.createPool(config);