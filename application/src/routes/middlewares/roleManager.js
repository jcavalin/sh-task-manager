import label from "../../helpers/label.js";

export default (roles) => {
    return (req, res, next) => {
        roles = Array.isArray(roles) ? roles : [roles];

        if (!roles.includes(req.token.role)) {
            return res.status(403).json({message: label('forbidden')});
        }

        next();
    }
}