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
// Get all user
const getAllUser = async (req, res) => {
	try {
		let data = await model.user.findAll();
		success(res, data, 'Thành công !');
	} catch (err) {
		error(res, 'Server is error');
	}
};

// Get user by id
const getUser = async (req, res) => {
	try {
		let { id } = req.params;
		let dataOne = await model.user.findOne({
			where: {
				user_id: id,
			},
		});
		if (dataOne) {
			success(res, dataOne, 'Thành công!');
		} else {
			failSyntax(res, dataOne, 'User không tồn tại!');
		}
	} catch (err) {
		error(res, 'Server is error');
	}
};

// create new user
const createUser = async (req, res) => {
	try {
		let { full_name, email, pass_word } = req.body;
		let models = {
			full_name,
			email,
			pass_word,
		};
		let data = await model.user.create(models);
		if (data) {
			success(res, data, 'Thêm user thành công!');
		}
	} catch (err) {
		error(res, 'Server is error');
	}
};

// updated user
const updateUser = async (req, res) => {
	try {
		let { id } = req.params;
		let dataOne = await model.user.findOne({
			where: {
				user_id: id,
			},
		});
		if (dataOne) {
			let { full_name, email, pass_word } = req.body;
			let models = {
				full_name,
				email,
				pass_word,
			};
			let dataUpdate = await model.user.update(models, {
				where: {
					user_id: id,
				},
			});

			if (dataUpdate[0] === 1) {
				success(res, dataUpdate, 'Cập nhật user thành công!');
			} else {
				success(res, dataUpdate, 'Không có trường nào thay đổi!');
			}
		} else {
			failSyntax(res, dataOne, 'User không tồn tại!');
		}
	} catch (err) {
		error(res, 'Server is error');
	}
};

// deleted user
const deleteUser = async (req, res) => {
	try {
		let { id } = req.params;
		let dataOne = await model.user.findOne({
			where: {
				user_id: id,
			},
		});
		if (dataOne) {
			let data = await model.user.destroy({
				where: {
					user_id: id,
				},
			});
			if (data[0] === 1) {
				success(res, data, 'Xóa user thành công!');
			}
		} else {
			failSyntax(res, dataOne, 'User không tồn tại!');
		}
	} catch (error) {
		error(res, 'Server is error');
	}
};
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
		let { user_id } = req.body;
		let isReqExits = hasReqClient(res, user_id);
		if (!isReqExits) {
			return;
		}
		let isUserExits = await hasDataExist('user', 'user_id', user_id);
		if (!isUserExits) {
			notFound(res, { user_id: user_id }, 'User does not exits!');
			return;
		}
		// Kiểm tra người dùng đã like nhà hàng đó chưa
		const result = await model.like_res.findAll({
			include: 'restaurant_details',
			attributes: ['date_like'],
			where: { user_id },
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
	getAllUser,
	getUser,
	createUser,
	updateUser,
	deleteUser,
	likeRes,
	unlikeRes,
	getLikeResList,
	rateRes,
	getRateResList,
};
