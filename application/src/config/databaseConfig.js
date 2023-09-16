import {env} from 'node:process';

export default {
    host: env.DB_HOST,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    connectTimeout: 60,
    connectionLimit: 10
}