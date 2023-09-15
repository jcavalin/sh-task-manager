import label from "../../config/labelConfig.js";
import AuthorizationToken from "../../helpers/AuthorizationToken.js";

export default (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({message: label('token_not_found')});
    }

    const authorizationToken = new AuthorizationToken();
    authorizationToken.verify(token, function (error, decoded) {
        if (error) {
            return res.status(403).send({message: label('token_invalid')});
        }

        req.token = decoded;
        next();
    });
}