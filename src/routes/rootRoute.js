const express = require('express');
const foodRoute = require('./foodRoute');
const rootRoute = express.Router();
const userRoute = require('./userRoute');

rootRoute.use('/user', userRoute);
rootRoute.use('/food', foodRoute);

module.exports = rootRoute;
