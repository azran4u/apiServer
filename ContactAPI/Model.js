let mongoose = require('mongoose');
let config = require('config');
let db = require('../Database/mongodb');

// Setup schema
var contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    create_date: {
        type: Date,
        default: Date.now
    }
}, { collection: config.mongodb.collection });

// Export Contact model
var Contact = module.exports = mongoose.model(config.mongodb.collection, contactSchema);


module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
};