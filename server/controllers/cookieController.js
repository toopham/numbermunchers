const cookieController = {};


cookieController.setCookie = (req, res, next) => {
	res.cookie('nummucher', '1');
	return next();
};

cookieController.setSSIDCookie = (req, res, next) => {
	res.cookie('muncher', res.locals.session, {httpOnly: true});
	next();
};

cookieController.removeCookie = (req, res, next) => {
	res.clearCookie('muncher');
	next();
}

module.exports = cookieController;