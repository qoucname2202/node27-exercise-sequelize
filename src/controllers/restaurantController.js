// const User = require('../model/user');
const sequelize = require('../model/index');
const initModels = require('../model/init-models');
const model = initModels(sequelize);
const { success, failSyntax, error, notFound } = require('../config/response');
const { hasReqClient, hasDataExist } = require('../utils/utils');

const getUserLikeRes = async (req, res) => {
	try {
		let { id } = req.params;
		let checkReq = hasReqClient(res, id);
		if (!checkReq) {
			return;
		}
		let checkRes = hasDataExist('restaurant', 'res_id', id);
		if (!checkRes) {
			notFound(res, '', 'Restaurant does not exits');
			return;
		}
		let result = await model.like_res.findAll({
			include: 'user_details',
			attributes: ['date_like'],
			where: {
				res_id: id,
			},
		});
		if (result.length === 0) {
			success(res, result, 'Restaurant has not user like');
			return;
		}
		success(res, result, 'Get list user successfully!');
	} catch (err) {
		error(res, 'Server is error');
	}
};

const getUserRateRes = async (req, res) => {
	try {
		let { id } = req.params;
		let checkReq = hasReqClient(res, id);
		if (!checkReq) {
			return;
		}
		let checkRes = hasDataExist('restaurant', 'res_id', id);
		if (!checkRes) {
			notFound(res, '', 'Restaurant does not exits');
			return;
		}
		let result = await model.rate_res.findAll({
			include: 'user_details',
			attributes: ['date_rate'],
			where: {
				res_id: id,
			},
		});
		if (result.length === 0) {
			success(res, '', 'Restaurant has not user rate');
			return;
		}
		success(res, result, 'Get list user successfully!');
	} catch (err) {
		error(res, 'Server is error');
	}
};

module.exports = { getUserLikeRes, getUserRateRes };
