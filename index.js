// Import Configuration
let env = process.env.NODE_ENV || 'development';
global.config = require(`./Config/env/${env}`);
// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Initialize the app
let app = express();
// Import Database
let db = require('./Database/mongodb');
// Import ContactAPI
let apiRoutes = require("./ContactAPI/Routes");


// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api ContactAPI in the App
app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(config.webserver.port, function () {
    console.log("Running RestHub on port " + config.webserver.port);
});