const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');


app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static(path.join(__dirname, '../public')));

// serve index.html on the route '/'
app.post('/signup', userController.createUser, (req, res) => {
	return res.status(200).send('SUCCESSFULLY ADDED USER');
});

app.post('/login', userController.verifyUser, (req, res) => {
	return res.redirect(303, '/play');
});

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
});



app.listen(3000); //listens on port 3000 -> http://localhost:3000/
