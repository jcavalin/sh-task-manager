import winston from "winston";

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'logs/general.log'
        })
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(info => `${[info.timestamp]} [${info.level}]: ${info.message}`),
    )
});

const loggerHandler = {};

loggerHandler.error = (message) => {
    logger.error(toString(message));
};

loggerHandler.warn = (message) => {
    logger.warn(toString(message));
};

loggerHandler.info = (message) => {
    logger.info(toString(message));
};

function toString(message) {
    if (Array.isArray(message) || typeof message == 'object') {
        return JSON.stringify(message);
    }

    return message;
}

export default loggerHandler;