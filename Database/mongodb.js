// Import Mongoose
let mongoose = require('mongoose');
let config = require('config');
let logger = require('../Logging/logging');

// integrate mongoose with winstone
mongoose.set('debug', function (coll, method, query, doc) {
    logger.info("mongoose " + coll + " " + method);
});
// Connect to Mongoose and set connection variable
mongoose.connect(config.mongodb.server+"/"+config.mongodb.database , { useNewUrlParser: true } );
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;