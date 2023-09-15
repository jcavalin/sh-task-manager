import UserService from "../services/UserService.js";
import labelConfig from "../config/labelConfig.js";

export default class UserController {

    constructor() {
        this.service = new UserService();
    }

    async authenticateAction(req, res) {
        try {
            res.send({'token': await this.service.authenticate(req.body.email, req.body.password)});
        } catch (error) {
            console.error(error); // @todo Change to a proper logger
            res.status(401).send({message: labelConfig.authentication_failed});
        }
    }
}