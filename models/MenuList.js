
const mongoose = require('mongoose');

//Create a MenuList Schema
const MenuListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default: [],
    },
    num_sales: {
        type: Number,
        required: true
    }

});

// Create MenuItem Model
const MenuList = mongoose.model('MenuItem', MenuListSchema);
module.exports =MenuList;