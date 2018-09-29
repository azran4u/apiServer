let winston = require('winston');


// define the custom settings for each transport (file, console)
let options = {
    file: {
        level: 'info',
        filename: `./Logging/logs/combined.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true
    },
    console: {
        level: 'info',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File(options.file),
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console(options.console));
}

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

logger.exitOnError = false;

module.exports = logger;
