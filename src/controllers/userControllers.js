// const User = require('../model/user');
const sequelize = require('../model/index');
const initModels = require('../model/init-models');
const moment = require('moment');
const model = initModels(sequelize);
const {
	success,
	failSyntax,
	error,
	notFound,
	conflict,
} = require('../config/response');
const { hasReqClient, hasDataExist } = require('../utils/utils');

// like restaurant
const likeRes = async (req, res) => {
	try {
		let { user_id, res_id } = req.body;
		let isReqExits = hasReqClient(res, user_id, res_id);
		if (!isReqExits) {
			return;
		}
		// Kiếm tra
		let isUserAndResExits = await hasUserResExist(
			res,
			'user',
			'user_id',
			Number(user_id),
			'restaurant',
			'res_id',
			Number(res_id),
		);
		if (!isUserAndResExits) {
			return;
		}
		// Kiểm tra người dùng đã like nhà hàng đó chưa
		const isLike = await model.like_res.findOne({
			where: {
				user_id: Number(user_id),
				res_id: Number(res_id),
			},
		});
		// Nếu người dùng đã like nhà hàng đó rồi thì thông báo
		if (isLike) {
			conflict(res, '', 'Already liked the restaurant');
			return;
		}
		let val = {
			user_id,
			res_id,
			date_like: moment().format(),
		};
		const result = await model.like_res.create(val);
		success(res, result, 'Like success!');
	} catch (err) {
		error(res, 'Server is error');
	}
};
// unlike restaurant
const unlikeRes = async (req, res) => {
	try {
		let { user_id, res_id } = req.body;
		let isReqExits = hasReqClient(res, user_id, res_id);
		if (!isReqExits) {
			return;
		}
		// Kiếm tra
		let isUserAndResExits = await hasUserResExist(
			res,
			'user',
			'user_id',
			Number(user_id),
			'restaurant',
			'res_id',
			Number(res_id),
		);
		if (!isUserAndResExits) {
			return;
		}
		// Kiểm tra người dùng đã like nhà hàng đó chưa
		const isLike = await model.like_res.findOne({
			where: {
				user_id: Number(user_id),
				res_id: Number(res_id),
			},
		});
		// Nếu người dùng đã like nhà hàng đó rồi thì thông báo
		if (!isLike) {
			conflict(res, '', 'User not liked the restaurant yet');
			return;
		}
		const result = await model.like_res.destroy({
			where: {
				user_id,
				res_id,
			},
		});
		success(res, result, 'Unlike restaurant successfully!');
	} catch (err) {
		error(res, 'Server is error');
	}
};
// get like restaurant list
const getLikeResList = async (req, res) => {
	try {
		let { id } = req.params;
		let isReqExits = hasReqClient(res, id);
		if (!isReqExits) {
			return;
		}
		let isUserExits = await hasDataExist('user', 'user_id', id);
		if (!isUserExits) {
			notFound(res, { user_id: id }, 'User does not exits!');
			return;
		}
		// Kiểm tra người dùng đã like nhà hàng đó chưa
		const result = await model.like_res.findAll({
			include: 'restaurant_details',
			attributes: ['date_like'],
			where: { user_id: id },
		});
		if (result.length === 0) {
			success(res, result, 'User does not like restaurant!');
			return;
		}
		success(res, result, 'Get restaurant list successfully!');
	} catch (err) {
		error(res, 'Server is error');
	}
};

// rate restaurant
const rateRes = async (req, res) => {
	try {
	} catch (err) {
		error(res, 'Server is error');
	}
};
// get rate restaurant list
const getRateResList = async (req, res) => {
	try {
	} catch (err) {
		error(res, 'Server is error');
	}
};
module.exports = {
	likeRes,
	unlikeRes,
	getLikeResList,
	rateRes,
	getRateResList,
};
