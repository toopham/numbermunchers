const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://dbtoopham:SSOH7YREdv0WtXb4@nummunchersdb.fzjmt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: 'numdb'
})
	.then(() => console.log("Connected to Mongo DB"))
	.catch((err) => console.log('ERROR CANNOT CONNECT TO MONGO DB :', err));

	const Schema = mongoose.Schema;

	const userSchema = new Schema({
		userName: {type: String, required: true, unique: true},
		firstName: {type: String, required: true},
		lastName: {type: String, required: true},
		password: {type: String, required: true},
		currentLevel: Number,
	});

	const User = mongoose.model('user', userSchema);

	module.exports = User;