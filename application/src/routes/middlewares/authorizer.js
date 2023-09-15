import labelConfig from "../../config/labelConfig.js";
import AuthorizationToken from "../../helpers/AuthorizationToken.js";

export default function (req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({message: labelConfig.token_not_found});
    }

    const authorizationToken = new AuthorizationToken();
    authorizationToken.verify(token, function (error, decoded) {
        if (error) {
            return res.status(401).json({auth: false, message: labelConfig.not_authorized});
        }

        req.token = decoded;
        next();
    });
}