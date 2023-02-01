// const User = require('../model/user');
const sequelize = require('../model/index');
const initModels = require('../model/init-models');
const model = initModels(sequelize);
// const { success, failSyntax, error } = require('../config/response');

const getUserLikeRes = async (req, res) => {
	res.send('Get user like restaurant');
};

const getUserRateRes = async (req, res) => {
	res.send('Get user rate restaurant');
};

module.exports = { getUserLikeRes, getUserRateRes };
