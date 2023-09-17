import jsonwebtoken from "jsonwebtoken";
import tokenConfig from "../config/tokenConfig.js";

function generateToken(payload) {
    return jsonwebtoken.sign(
        payload,
        tokenConfig.secret,
        {
            algorithm: 'HS256',
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
            algorithms: ['HS256'],
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