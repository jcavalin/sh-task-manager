import jsonwebtoken from "jsonwebtoken";
import {env} from 'node:process';

function generateToken(payload) {
    return jsonwebtoken.sign(payload, env.JWT_SECRET, {expiresIn: 3600});
}

function verifyToken(token, callback) {
    jsonwebtoken.verify(token, env.JWT_SECRET, callback); // @todo Improve verification
}

export {
    generateToken,
    verifyToken
}