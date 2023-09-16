import {env} from 'node:process';

export default {
    host: env.QUEUE_HOST,
    port: env.QUEUE_PORT,
    username: env.QUEUE_USERNAME,
    password: env.QUEUE_PASSWORD,
    notify_queue: env.QUEUE_NOTIFY_NAME
}