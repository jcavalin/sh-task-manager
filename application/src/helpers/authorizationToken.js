import jsonwebtoken from "jsonwebtoken";
import tokenConfig from "../config/tokenConfig.js";

function generateToken(payload) {
    return jsonwebtoken.sign(payload, tokenConfig.secret, {expiresIn: 3600});
}

function verifyToken(token, callback) {
    jsonwebtoken.verify(token, tokenConfig.secret, callback); // @todo Improve verification
}

export {
    generateToken,
    verifyToken
}