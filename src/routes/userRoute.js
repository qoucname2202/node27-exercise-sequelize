const express = require('express');
const userRoute = express.Router();

const {
	getUser,
	createUser,
	updateUser,
	deleteUser,
	getAllUser,
	likeRes,
	unlikeRes,
	getLikeResList,
	rateRes,
	getRateResList,
} = require('../controllers/userControllers');

userRoute.get('/getAllUser', getAllUser);
userRoute.get('/getUser/:id', getUser);
userRoute.post('/createUser', createUser);
userRoute.put('/updateUser/:id', updateUser);
userRoute.delete('/deleteUser/:id', deleteUser);
// like restaurant
userRoute.post('/likeRes', likeRes);
// unlike restaurant
userRoute.delete('/unlikeRes', unlikeRes);
// get like restaurant list
userRoute.get('/getLikeResList', getLikeResList);
// rate restaurant
userRoute.post('/rateRes', rateRes);
// get rate reataurant list
userRoute.get('/getRateResList', getRateResList);
module.exports = userRoute;
