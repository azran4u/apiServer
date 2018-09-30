let winston = require('winston');
const MESSAGE = Symbol.for('message');

const jsonFileFormatter = (logEntry) => {
    const base = {timestamp: new Date()};
    const json = Object.assign(base, logEntry)
    logEntry[MESSAGE] = JSON.stringify(json);
    return logEntry;
}

let consoleFormatter = winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize({ all: true }),
    winston.format.align(),
    winston.format.printf((info) => {
        const {
            timestamp, level, message, ...args
        } = info;

        // const ts = timestamp.slice(0, 19).replace('T', ' ');
        return `${timestamp} ${level}: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    }));

// define the custom settings for each transport (file, console)
let options = {
    file: {
        level: 'info',
        filename: `./Logging/logs/combined.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        exitOnError: false,
        format: winston.format(jsonFileFormatter)()
    },
    console: {
        level: 'info',
        format: consoleFormatter,
        exitOnError: false
    },
};

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File(options.file),
    ]
});

// console added by default so we explicitly add it and remove if production
const console = new winston.transports.Console();
logger.remove(console); // Remove console transport
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
