const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: String,
    price: { type: Number, default: 0 },
    category: { type: String, enum: ['foods', 'technology', 'home'] },
    image: String
});

const Products = module.exports = mongoose.model('Products', Schema);