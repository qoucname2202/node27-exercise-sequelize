// const User = require('../model/user');
const sequelize = require('../model/index');
const initModels = require('../model/init-models');
const model = initModels(sequelize);
const { success, failSyntax, error } = require('../config/response');

const getAllUser = async (req, res) => {
	try {
		let data = await model.user.findAll();
		success(res, data, 'Thành công !');
	} catch (err) {
		error(res, 'Server is error');
	}
};

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

module.exports = {
	getAllUser,
	getUser,
	createUser,
	updateUser,
	deleteUser,
};
