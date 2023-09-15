import UserService from "../services/UserService.js";
import label from "../config/labelConfig.js";

const authenticate = async (req, res) => {
    try {
        const service = new UserService();
        res.send({'token': await service.authenticate(req.body.email, req.body.password)});
    } catch (error) {
        console.error(error); // @todo Change to a proper logger
        res.status(401).send({message: label('authentication_failed')});
    }
};

export {
    authenticate
};