const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	userName: {type: String, required: true, unique: true},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	password: {type: String, required: true},
	currentLevel: {type: Number, default: 1},
	score: {type: Number, default: 0},
});

const User = mongoose.model('user', userSchema);

module.exports = User;