const sequelize = require('../model/index');
const initModels = require('../model/init-models');
const { hasReqClient, hasDataExist } = require('../utils/utils');
const model = initModels(sequelize);
const { success, error, notFound, conflict } = require('../config/response');
// check user and food is exits database
const hasUserFoodExits = async (
	response,
	tblUser,
	userKey,
	userId,
	tblFood,
	foodKey,
	foodId,
) => {
	const isUserExits = await hasDataExist(tblUser, userKey, userId);
	const isResExits = await hasDataExist(tblFood, foodKey, foodId);
	if (!isUserExits) {
		notFound(response, { user_id: userId }, 'User does not existed');
		return false;
	}
	if (!isResExits) {
		notFound(response, { food_id: foodId }, 'Food does not existed');
		return false;
	}
	return true;
};
// order food by user
const createOrder = async (req, res) => {
	try {
		let { user_id, food_id, amount, code, arr_sub_id } = req.body;
		let isReqExits = hasReqClient(res, user_id, food_id);
		if (!isReqExits) {
			return;
		}
		if (amount <= 0) {
			conflict(res, { amount }, 'Order amount must be greater than 0');
			return;
		}
		let isUserAndResExits = await hasUserFoodExits(
			res,
			'user',
			'user_id',
			Number(user_id),
			'food',
			'food_id',
			Number(food_id),
		);
		if (!isUserAndResExits) {
			return;
		}
		let hasOrderFood = await model.order.findOne({
			where: {
				user_id,
				food_id,
			},
		});
		if (hasOrderFood) {
			conflict(
				res,
				{ user_id, food_id },
				'Order has already existed, please try other order',
			);
			return;
		}
		let result = await model.order.create({
			user_id: Number(user_id),
			food_id: Number(food_id),
			amount: Number(amount),
			code,
			arr_sub_id,
		});
		success(res, result, 'Order successfully!');
	} catch (err) {
		error(res, 'Server is error');
	}
};
module.exports = createOrder;
