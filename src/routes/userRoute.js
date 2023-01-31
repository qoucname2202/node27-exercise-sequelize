const express = require('express');
const userRoute = express.Router();

const {
	getUser,
	createUser,
	updateUser,
	deleteUser,
	getAllUser,
} = require('../controllers/userControllers');

userRoute.get('/getAllUser', getAllUser);

userRoute.get('/getUser/:id', getUser);

userRoute.post('/createUser', createUser);

userRoute.put('/updateUser/:id', updateUser);

userRoute.delete('/deleteUser/:id', deleteUser);

module.exports = userRoute;
