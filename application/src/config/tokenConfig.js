import {env} from 'node:process';

export default {
    secret: env.JWT_SECRET
};