// Kết nối cơ sở dữ liệu
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('db_food', 'root', '1234', {
	dialect: 'mysql',
	host: 'localhost',
	port: '3306',
});
module.exports = sequelize;
// dialect: hệ cơ sở dữ liệu đang sử dụng
// try {
// 	sequelize.authenticate();
// 	console.log('Connect has been established successfully');
// } catch (error) {
// 	console.log('Unable to connect to the database');
// }
