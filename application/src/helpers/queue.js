import amqp from "amqplib";
import queueConfig from "../config/queueConfig.js";
import logger from "./logger.js";

async function createConnection() {
    return await amqp.connect(
        `amqp://${queueConfig.username}:${queueConfig.password}@${queueConfig.host}:${queueConfig.port}`
    );
}

async function queueMessage(queue, message) {
    let connection;

    try {
        connection = await createConnection();
        const channel = await connection.createChannel();

        if (Array.isArray(message) || typeof message === 'object') {
            message = JSON.stringify(message);
        }

        await channel.assertQueue(queue, {durable: false});
        channel.sendToQueue(queue, Buffer.from(message));
        logger.info(`Sent to queue '${queue}'`);

        await channel.close();
    } catch (error) {
        logger.error(error.message);
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}

export {
    queueMessage
}