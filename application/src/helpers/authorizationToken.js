import jsonwebtoken from "jsonwebtoken";
import tokenConfig from "../config/tokenConfig.js";

function generateToken(payload) {
    return jsonwebtoken.sign(
        payload,
        tokenConfig.secret,
        {
            expiresIn: 3600,
            audience: tokenConfig.audience,
            issuer: tokenConfig.issuer
        }
    );
}

function verifyToken(token, callback) {
    jsonwebtoken.verify(
        token,
        tokenConfig.secret,
        {
            audience: tokenConfig.audience,
            issuer: tokenConfig.issuer
        },
        callback
    );
}

export {
    generateToken,
    verifyToken
}