const moment = require('moment');

const success = (res, data, message) => {
	res.status(200).json({
		statusCode: 200,
		message,
		content: data,
		dateTime: moment().format(),
	});
};

const initial = (res, data, message) => {
	res.status(201).json({
		statusCode: 201,
		message,
		content: data,
		dateTime: moment().format(),
	});
};

const failSyntax = (res, data, message) => {
	res.status(400).json({
		statusCode: 400,
		message,
		content: data,
		dateTime: moment().format(),
	});
};

const unauthorized = (res, data, message) => {
	res.status(401).json({
		statusCode: 401,
		message,
		content: data,
		dateTime: moment().format(),
	});
};

const notFound = (res, data, message) => {
	res.status(404).json({
		statusCode: 404,
		message,
		content: data,
		dateTime: moment().format(),
	});
};

const forbinden = (res, data, message) => {
	res.status(403).json({
		statusCode: 403,
		message,
		content: data,
		dateTime: moment().format(),
	});
};

const conflict = (res, data, message) => {
	res.status(409).json({
		statusCode: 409,
		message,
		content: data,
		dateTime: moment().format(),
	});
};

const error = (res, message) => {
	res.status(500).json({
		statusCode: 500,
		message,
		dateTime: moment().format(),
	});
};

module.exports = {
	success,
	initial,
	failSyntax,
	unauthorized,
	notFound,
	forbinden,
	conflict,
	error,
};
