// console.log("Hey whatsUPP!!");

// var _=require('lodash');   //usually we use _ as lodash variable for lodash package

// var data=["amit","amit",3,3,5,"age","5","hello"];
// var filter=_.uniq(data);   //many more functns are avilable 
// console.log(filter);

const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();  //module to maintain security of sensitive info/data

const bodyParser = require('body-parser');
app.use(bodyParser.json());  //received in req.body
const PORT = process.env.PORT || 3000;  //using .env


app.get('/', function (req, res) {
  res.send('Hello i am Amit & Welcome to our Hotel!!')
})

// app.get('/jai', function (req, res) {
//     res.send('Om Namah Shivaya!!')
//   })

//   app.get('/food', function (req, res) {
//     var customized_food={
//         name:'dal chawal',
//         size:'1 plate',
//         is_fresh:true,
//     }
//     res.send(customized_food)
//   })

//import the router files
const personRoutes= require('./routes/personRoutes');
const menuListRoutes=require('./routes/menuListRoutes');

//use the routers
app.use('/person',personRoutes);
app.use('/menu',menuListRoutes);


app.listen(PORT, () => {
  console.log("listening on port 3000");
})