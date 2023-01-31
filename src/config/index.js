// Biến toàn cục process  = window
require('dotenv').config();

module.exports = {
	dbDatatbase: process.env.DB_DATABASE,
	dbUser: process.env.DB_USER,
	dbPass: process.env.DB_PASS,
	dbHost: process.env.DB_HOST,
	dbPort: process.env.DB_PORT,
	dbDialet: process.env.DB_DIALET,
	port: process.env.PORT,
};
