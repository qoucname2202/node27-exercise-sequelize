const express = require('express');
const foodRoute = require('./foodRoute');
const restaurantRoute = require('./restaurantRoute');
const rootRoute = express.Router();
const userRoute = require('./userRoute');

rootRoute.use('/user', userRoute);
rootRoute.use('/food', foodRoute);
rootRoute.use('/restaurant', restaurantRoute);

module.exports = rootRoute;
