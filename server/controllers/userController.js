const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { isValidObjectId } = require('mongoose');
const userController ={};

userController.getUsers = (req, res, next) =>{

	User.find({}).sort('score').limit(10)
		.then(users => {
			res.locals.users = users;
			return next();
		})
		.catch(err => next('Error in get users: '+JSON.stringify(err)));

};

userController.createUser = (req, res, next) => {
	const encrypted = bcrypt.hashSync(req.body.password, 10);
	const newUser = {... req.body, password: encrypted};

	User.create(newUser)
		.then((user) => {
			res.locals.userId = user._id.toString();
			res.locals.userName = user.userName;
			return next();
		})
		.catch((err) => {
			return next(err);
		});
};

userController.getUser = (req, res, next) => {
	if(res.locals.userId){
		User.findById(res.locals.userId)
		.then((user) => {
			user._id = user._id.toString();
			res.locals.user = user;
			return next();
		})
		.catch((err) => next('ERROR in get user : '+JSON.stringify(err)));
	}
	else{ 
		res.locals.user ={
			firstName: 'Guest',
			lastName: 'Player', 
			userName: 'Guest',
			currentLevel: 1,
			lives: 3,
			score: 0,
			status: 1,
			userID: '',
		};
		return next();
	}
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
					res.locals.userName = user[0].userName;
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

