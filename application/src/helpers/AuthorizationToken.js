import jsonwebtoken from "jsonwebtoken";
import {env} from 'node:process';

export default class AuthorizationToken {
    generate(payload) {
        return jsonwebtoken.sign(payload, env.JWT_SECRET, {expiresIn: 3600});
    }

    verify(token, callback) {
        jsonwebtoken.verify(token, env.JWT_SECRET, callback); // @todo Improve verification
    }
}