// Kết nối cơ sở dữ liệu
const { Sequelize } = require('sequelize');
const config = require('../config/index');
const sequelize = new Sequelize(
	config.dbDatatbase,
	config.dbUser,
	config.dbPass,
	{
		dialect: config.dbDialet,
		host: config.dbHost,
		port: config.dbPort,
	},
);
module.exports = sequelize;
// dialect: hệ cơ sở dữ liệu đang sử dụng
// try {
// 	sequelize.authenticate();
// 	console.log('Connect has been established successfully');
// } catch (error) {
// 	console.log('Unable to connect to the database');
// }
