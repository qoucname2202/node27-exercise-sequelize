const express = require('express');
const restaurantRoute = express.Router();

const {
	getUserLikeRes,
	getUserRateRes,
} = require('../controllers/restaurantController');

// Get user list like restaurant
restaurantRoute.get('/getUserLikeRes', getUserLikeRes);
// Get user list rate restaurant
restaurantRoute.get('/getUserRateRes', getUserRateRes);

module.exports = restaurantRoute;
