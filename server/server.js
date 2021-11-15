const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
const cookieController = require('./controllers/cookieController');

const MONGO_URI = require('./data/secret.js')

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: 'numdb'
})
	.then(() => console.log("Connected to Mongo DB"))
	.catch((err) => console.log('ERROR CANNOT CONNECT TO MONGO DB :', err));


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '../public/')));

app.use('/assets', express.static(path.join(__dirname, '../src/assets/')));



// serve index.html on the route '/'
app.post('/api/signup', userController.createUser, sessionController.startSession, cookieController.setSSIDCookie, (req, res) => {
	return res.status(200).json(res.locals.user);
});

app.post('/api/login', userController.verifyUser, sessionController.startSession, 
		cookieController.setSSIDCookie, (req, res) => {
	return res.redirect(303, '/');
});

//serve user info if user is logged in
app.get('/api', sessionController.isLoggedIn, userController.getUser, (req, res) => res.status(200).json(res.locals.user));
app.post('/api', sessionController.isLoggedIn, userController.updateUser, (req, res) => res.status(200).json({}));

app.get('/api/scores', userController.getUsers, (req, res) => res.status(200).json(res.locals.users));


app.get('/api/logout', sessionController.isLoggedIn, sessionController.endSession, cookieController.removeCookie, (req,res)=> res.redirect(303,'/'));


// app.get('/', sessionController.isLoggedIn, (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
// });


app.use((req,res) => res.status(404).sendFile(path.join(__dirname, '../html/index.html')));

app.use( (err, req, res, next) => {
	return res.redirect(500,'/');
});


app.listen(3000); //listens on port 3000 -> http://localhost:3000/
