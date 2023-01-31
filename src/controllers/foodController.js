const food_type = require('../model/food_type');
const sequelize = require('../model/index');
const initModels = require('../model/init-models');
const model = initModels(sequelize);
const { success, failSyntax, error } = require('../config/response');

const getAllFood = async (req, res) => {
	try {
		let data = await model.food.findAll({
			include: ['type'],
		});
		success(res, data, 'Thành công!');
	} catch (err) {
		error(res, 'Server is error');
	}
};
const getAllFoodType = async (req, res) => {
	try {
		let data = await model.food_type.findAll({
			include: ['foods'],
		});
		success(res, data, 'Thành công!');
	} catch (err) {
		error(res, 'Server is error');
	}
};
const getLikeRes = async (req, res) => {
	try {
		let data = await model.user.findAll({
			include: [],
		});
		success(res, data, 'Thành công!');
	} catch (err) {
		error(res, 'Server is error');
	}
};

module.exports = {
	getAllFood,
	getAllFoodType,
	getLikeRes,
};
