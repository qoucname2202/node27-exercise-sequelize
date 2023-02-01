const sequelize = require('../model/index');
const initModels = require('../model/init-models');
const model = initModels(sequelize);
const { success, failSyntax, error } = require('../config/response');

// Check data exist
const hasDataExist = async (tblName, idKey, idBody) => {
	const isValue = await model[tblName].findOne({
		where: {
			[idKey]: idBody,
		},
	});
	return isValue ? true : false;
};

// Check data from clinet to server missing or incorrect req data
const hasReqClient = (res, ...reqData) => {
	reqData.forEach(item => {
		if (!item) {
			failSyntax(res, '', 'Missing or incorrect request data');
			return false;
		}
	});
	return true;
};

module.exports = { hasDataExist, hasReqClient };
