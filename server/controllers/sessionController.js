const Session = require('../models/sessionModel');
const bcrypt = require('bcryptjs');
const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
	console.log('COOKIES MUNCHER :', req.cookies.muncher);
	Session.find({ cookieID: req.cookies.muncher})
		.then( session => {
			if(session[0]){
				console.log('IS LOGGED IN: ', session[0])
				res.locals.userId = session[0].userID;
				return next();
			}
			else{
				console.log('NOT LOGGED IN');
				return next();
			}
		})
		.catch(err => next('Error in sessionController  isLoggedIn:'+JSON.stringify(err)));
};


sessionController.startSession = (req, res, next) =>{
	res.locals.session = bcrypt.hashSync(res.locals.userName, 10);
	
	Session.create({cookieID: res.locals.session, userID: res.locals.userId})
		.then(session => next())
		.catch(err => next('Error in sessionController startSession'+JSON.stringify(err)));
};

sessionController.endSession = (req, res, next) =>{
	Session.deleteOne({cookieID: res.locals.userId})
		.then(session => next())
		.catch( err => next('Error in ending session :'+JSON.stringify(err)));
}

module.exports = sessionController;