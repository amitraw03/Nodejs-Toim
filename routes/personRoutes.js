const express = require('express');
const router = express.Router();
const Person = require('./../models/PersonDet');

//Post method to store person details
router.post('/', async (req, res) => {
    try {
        const data = req.body //assume req body contains the person's data

        //creata a new Person doc using mongoose model
        const newPerson = new Person(data);

        //Save the new Person to the DB
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//GEt Method to get the person
router.get('/', async (req, res) => {
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