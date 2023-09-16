import amqp from "amqplib";
import queueConfig from "../config/queueConfig.js";

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

        await channel.assertQueue(queueConfig.name, {durable: false});
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Sent to queue '${queue}': ${message}`); // @todo Add a proper log

        await channel.close();
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}

export {
    queueMessage
}