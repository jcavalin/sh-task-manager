import label from "../../helpers/label.js";
import {verifyToken} from "../../helpers/authorizationToken.js";

export default (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({message: label('token_not_found')});
    }

    verifyToken(token, function (error, decoded) {
        if (error || !decoded.role || !decoded.email) {
            return res.status(403).send({message: label('token_invalid')});
        }

        req.token = decoded;
        next();
    });
}