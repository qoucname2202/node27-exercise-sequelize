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
// check user and restaurant is exits database
const hasUserResExist = async (
	response,
	tblUser,
	userKey,
	userId,
	tblRes,
	resKey,
	resId,
) => {
	const isUserExits = await hasDataExist(tblUser, userKey, userId);
	const isResExits = await hasDataExist(tblRes, resKey, resId);
	if (!isUserExits) {
		notFound(response, { user_id: userId }, 'User does not existed');
		return false;
	}
	if (!isResExits) {
		notFound(response, { res_id: resId }, 'Restaurant does not existed');
		return false;
	}
	return true;
};
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
		let { user_id, res_id, amount } = req.body;
		let isReqExits = hasReqClient(res, user_id, res_id, amount);
		if (!isReqExits) {
			return;
		}
		if (Number(amount) < 0 || Number(amount) >= 6) {
			failSyntax(
				res,
				{
					amount,
				},
				'Amount valid!',
			);
			return;
		}
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

		const isRate = await model.rate_res.findOne({
			where: {
				user_id: Number(user_id),
				res_id: Number(res_id),
			},
		});
		// Nếu người dùng đã đánh giá nhà hàng đó rồi mà muốn đánh giá lại
		if (isRate) {
			let val = {
				user_id,
				res_id,
				amount: Number(amount),
				date_rate: moment().format(),
			};
			await model.rate_res.update(val, {
				where: {
					user_id,
					res_id,
				},
			});
			success(res, val, 'Update restaurant rate successfully!');
			return;
		}
		// Nếu chưa có đánh giá thì thêm đánh giá người dùng vào hệ thống
		let val = {
			user_id,
			res_id,
			amount: Number(amount),
			date_rate: moment().format(),
		};
		await model.rate_res.create(val);
		success(res, val, 'Restaurant rate successfully!');
	} catch (err) {
		error(res, 'Server is error');
	}
};
// get rate restaurant list
const getRateResList = async (req, res) => {
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
		// Kiểm tra người dùng đã đánh giá nhà hàng đó chưa
		const result = await model.rate_res.findAll({
			include: 'restaurant_details',
			attributes: ['date_rate'],
			where: { user_id: id },
		});
		if (result.length === 0) {
			success(res, result, 'User does not rate restaurant!');
			return;
		}
		success(res, result, 'Get restaurant list successfully!');
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
