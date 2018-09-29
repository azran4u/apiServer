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
        colorize: true,
        timestamp: true
    },
    console: {
        level: 'info',
        handleExceptions: true,
        json: false,
        colorize: true,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize({ all: true }),
            winston.format.align(),
            winston.format.printf((info) => {
                const {
                    timestamp, level, message, ...args
                } = info;

                // const ts = timestamp.slice(0, 19).replace('T', ' ');
                return `${timestamp} ${level}: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
            }),
        )
    },
};

const logger = winston.createLogger({
    level: 'info',
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
