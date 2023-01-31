const express = require('express');
const foodRoute = express.Router();

const {
	getAllFood,
	getAllFoodType,
	getLikeRes,
} = require('../controllers/foodController');

foodRoute.get('/getAllFood', getAllFood);

foodRoute.get('/getAllFoodType', getAllFoodType);

foodRoute.get('/getLikeRes', getLikeRes);

module.exports = foodRoute;
