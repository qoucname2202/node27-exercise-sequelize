const express = require('express');
const createOrder = require('../controllers/orderController');
const orderRoute = express.Router();
// order food
orderRoute.post('/createOrder', createOrder);
module.exports = orderRoute;
