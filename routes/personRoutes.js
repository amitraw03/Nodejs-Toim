const express = require('express');
const router = express.Router();
const Person = require('./../models/PersonDet');
const {jsonAuthMiddleware,generateToken} = require('./../jwt');

//Post method to store person details
router.post('/signup', async (req, res) => {
    try {
        const data = req.body //assume req body contains the person's data

        //creata a new Person doc using mongoose model
        const newPerson = new Person(data);

        //Save the new Person to the DB
        const response = await newPerson.save();
        console.log('data saved');

        const payload={
            id : response.id,
            username : response.username
        }

        const token = generateToken(payload);
        res.status(200).json({response : response, token :token});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//login rrequest to verify tokens for entry
router.post('/login' ,async (req,res) =>{
     try{
          //extract username and pass from request body
          const{username,password} =req.body;
          //Find the user by username 
          const user = await Person.findOne({username :username});

          //if user doesn't exist or pass not matched
         if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error :'Invalid username or password'});
         }

         //if everything fine -> generate token
         const payload ={
            id : user.id,
            username : user.username
         }
         const token = generateToken(payload);

         //return token as response
         res.json({token : token});
     }
     catch(err){
          res.status(500).json({error :'Internal Server Error '});
     }
})

//Profile route with jwt authentication 
router.get('/profile',jsonAuthMiddleware, async(req,res) =>{
   try{
    const userData= req.user;
    console.log("UserData :",userData);

    const userId= userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({user});
   }
   catch(err){
    res.status(500).json({ error: 'Internal Server error ' });
   }
})

//GEt Method to get the person
router.get('/',jsonAuthMiddleware, async (req, res) => {  //here we added tokenbasedAuth to get the person details in hotels
    try {
        
        const data = await Person.find();
        console.log('data Fetched!!');
        res.status(200).json(data);
    } catch (err) {

        console.log(err);
        res.status(500).json({ error: 'Internal Server error ' });
    }
})

//paramterised Endpoint to URL
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;  //extract workType from url param
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid Work Type' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error ' });
    }
})

//update method to the person collection
router.put('/:id', async (req, res) => {    //id is var to identify doc inside collection
    try {
        const personId = req.params.id;  //Extract id from the URL parameter
        const updatedPersonData = req.body;  //updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,             //return the updated document
            runValidators: true,    //Run Mongoose validations
        })
        if (!response) {      //if extraxted id of person related doc is absent in collection
            return res.status(404), json({ error: "Person Not Found" });
        }
        console.log('Data Updated!!');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error ' });
    }

})

//Delete method in the person collection
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);  //here this functn will be used
        if (!response) {     
            return res.status(404), json({ error: "Person Not Found" });
        }
        console.log('Data Deleted!!');
        res.status(200).json({ message: " person Deleted Successfully!!" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error ' });
    }


})
module.exports = router;