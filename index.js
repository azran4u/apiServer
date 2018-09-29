// Import Configuration
process.env.NODE_ENV = 'development';
// application configuration
let config = require('config');
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import ContactAPI
let apiRoutes = require("./ContactAPI/Routes");
// application logger
let logger = require("./Logging/logging");
// express logging
let morgan = require("morgan");
// Import express

// Initialize the app
let app = express();
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Integrate morgan into winston
app.use(morgan('tiny', { stream: logger.stream }));

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
// Use Api ContactAPI in the App
app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(config.webserver.port, function () {
    logger.info("Running API Server on port " + config.webserver.port);
});

