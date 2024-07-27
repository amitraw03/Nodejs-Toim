// console.log("Hey whatsUPP!!");

// var _=require('lodash');   //usually we use _ as lodash variable for lodash package

// var data=["amit","amit",3,3,5,"age","5","hello"];
// var filter=_.uniq(data);   //many more functns are avilable 
// console.log(filter);

const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();  //module to maintain security of sensitive info/data
const passport=require('./auth');


const bodyParser = require('body-parser');
app.use(bodyParser.json());  //received in req.body
const PORT = process.env.PORT || 3000;  //using .env

//MiddleWare Function for logging the request in time form
const logRequest = (req,res,next) =>{
  console.log(`[${new Date().toLocaleString()}] Request Mode to :${req.originalUrl}`);
  next();  //move onto te next phase
}
app.use(logRequest);    //applying middleware to all routes


app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local',{session : false})
app.get('/',function (req, res) {
  res.send('Hello i am Amit & Welcome to our Hotel!!')
})

//import the router files
const personRoutes= require('./routes/personRoutes');
const menuListRoutes=require('./routes/menuListRoutes');

//use the routers
app.use('/person',personRoutes);
app.use('/menu',localAuthMiddleware,menuListRoutes);


app.listen(PORT, () => {
  console.log("listening on port 3000");
})