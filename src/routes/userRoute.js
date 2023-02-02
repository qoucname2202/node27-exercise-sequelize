const express = require('express');
const userRoute = express.Router();

const {
	likeRes,
	unlikeRes,
	getLikeResList,
	rateRes,
	getRateResList,
} = require('../controllers/userControllers');

// like restaurant
userRoute.post('/likeRes', likeRes);
// unlike restaurant
userRoute.delete('/unlikeRes', unlikeRes);
// get like restaurant list
userRoute.get('/getLikeResList/:id', getLikeResList);
// rate restaurant
userRoute.post('/rateRes', rateRes);
// get rate reataurant list
userRoute.get('/getRateResList/:id', getRateResList);
module.exports = userRoute;
