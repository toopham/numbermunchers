const Session = require('../models/sessionModel');
const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {

	Session.find({ cookieID: req.cookies.muncher})
		.then( session => {
			if(session[0]){
				res.locals.userId = req.cookies.muncher;
				return next();
			}
			else{
				return next('Error: not logged in');
			}
		})
		.catch(err => next('Error in sessionController  isLoggedIn:'+JSON.stringify(err)));
};


sessionController.startSession = (req, res, next) =>{
	Session.create({cookieID: res.locals.userId})
		.then(session => next())
		.catch(err => next('Error in sessionController startSession'+JSON.stringify(err)));
};

sessionController.endSession = (req, res, next) =>{
	Session.deleteOne({cookieID: res.locals.userId})
		.then(session => next())
		.catch( err => next('Error in ending session :'+JSON.stringify(err)));
}

module.exports = sessionController;