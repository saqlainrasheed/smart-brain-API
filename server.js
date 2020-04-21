const express = require('express');
const bodyParser = require('body-parser');
const app  = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
var knex = require('knex');

const Register = require('./controllers/Register')
const Signin = require('./controllers/Signin')
const Profile = require('./controllers/Profile')
const Image = require('./controllers/Image')

//knex library used to connect with database specially for realtional databases
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'admin',
    database : 'smart_brain_database'
  }
});


//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res)=>{
  res.json(database.users);
});


//POST request for signin form
app.post('/signin',(req,res)=>{Signin.handleSignin(req,res,db,bcrypt)});

//POST for registration form
app.post('/register',(req,res)=>{Register.handleRegister(req,res,db,bcrypt)}); 

//GET for profile for future use if we want to add a pofile page in our app
app.get('/profile/:id',(req,res)=>{Profile.handleProfile(req,res,db)});

//PUT request to update the entries on base of image scanned
app.put('/image',(req,res)=>{(req,res,db)=>Image.handleImage(req,res,db)});

app.post('/imageurl',(req,res)=>Image.handleApiCall(req,res));

app.listen(process.env.PORT || 3000,()=>{
  console.log(`app is running on port ${process.env.PORT}`);
});

