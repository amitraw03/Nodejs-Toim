const express = require('express');
const router= express.Router();
const MenuList = require('./../models/MenuList');


//Post method for MenuItems
 router.post('/', async (req, res) => {
    try {
      const data = req.body;
  
      const newMenuList = new MenuList(data);
      //Save the new Person to the DB
      const response = await newMenuList.save();
      console.log('data saved');
      res.status(200).json(response);
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
  
  //Get Method to get MenuList 
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

module.exports=router;  