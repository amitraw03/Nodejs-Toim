const mongoose = require('mongoose');
require('dotenv').config(); 

// Step-1: Define MongoDB connection URL
// const mongoURL =  process.env.MONGODB_URL_LOCAL; // 'hotels' here is the db name  
const mongoURL = process.env.MONGODB_URL; // 'hotels' here is the db name 

// Step-2: Setup MongoDB connection
mongoose.connect(mongoURL)
    .then(() => {
        console.log('Connected to MongoDB Server!!');
    })
    .catch(err => {
        console.log('MongoDB Connection Error:', err);
    });

// Step-3: Get default connection as connection object represents MongoDB connection
const db = mongoose.connection;

// Step-4: Define event listeners for db connection
db.on('error', (err) => {
    console.log('MongoDB Connection Error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB Disconnected!!');
});

// Step-5: Export the db connection
module.exports = db;
