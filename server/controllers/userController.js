const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { isValidObjectId } = require('mongoose');
const userController ={};

userController.createUser = (req, res, next) => {
	const encrypted = bcrypt.hashSync(req.body.password, 10);
	const newUser = {... req.body, password: encrypted};

	User.create(newUser)
		.then((user) => {
			res.locals.userId = user._id.toString();
			return next();
		})
		.catch((err) => {
			return next(err);
		});
};

userController.getUser = (req, res, next) => {
	User.findById(req.cookies.muncher)
		.then((user) => {
			res.locals.user = user;
			return next();
		})
		.catch((err) => next('ERROR IN getUSER : '+JSON.stringify(err)));
};

userController.updateUser = (req, res, next) => {
	User.findByIdAndUpdate(res.locals.userId, {currentLevel: req.body.level, score: req.body.score}, (err, res)=>{
		if(err){
			next(err);
		}
		else{
			next();
		}
	});
};

userController.verifyUser = (req, res, next) => {
	User.find({userName: req.body.userName})
		.then((user) =>{
			if(user[0]){
				if(bcrypt.compareSync(req.body.password, user[0].password)){
					res.locals.userId = user[0]._id.toString();
					return next();
				}
				else{
					return next('Incorrect password')
				}
			}
			else{
				return next('Incorrect username');
			}
		})
		.catch((err) => next(err));
};

module.exports = userController;

