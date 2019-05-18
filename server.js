const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {res.send('it is working!')})
app.post('/signin', (req,res) => {signin.handleSignin(req, res)} )
app.post('/register', (req,res) => {register.handleRegister(req, res)} )
app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req, res)} )
app.put('/image', (req,res) => {image.handleImage(req, res)} )
app.post('/imageurl', (req,res) => {image.handleApiCall(req, res)} )
app.listen(process.env.PORT || 3001,() =>{
	console.log(`app is running on port ${process.env.PORT || 3001}`);
});