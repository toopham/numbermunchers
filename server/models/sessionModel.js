const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
	cookieID: {type:String, required: true, unique: true},
	userID: {type:String, required: true, unique: true},
	createdAt: {type:String, expires: 3000, default: Date.now}
});

const sessionModel = mongoose.model('session', sessionSchema);

module.exports = sessionModel;