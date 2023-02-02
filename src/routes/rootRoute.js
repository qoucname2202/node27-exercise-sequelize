const express = require('express');
const foodRoute = require('./foodRoute');
const orderRoute = require('./orderRoute');
const restaurantRoute = require('./restaurantRoute');
const userRoute = require('./userRoute');
const rootRoute = express.Router();

rootRoute.use('/user', userRoute);
rootRoute.use('/food', foodRoute);
rootRoute.use('/restaurant', restaurantRoute);
rootRoute.use('/order', orderRoute);

module.exports = rootRoute;
