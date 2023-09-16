import {authenticateUser} from "../services/userService.js";
import label from "../config/labelConfig.js";

async function authenticateAction(req, res) {
    try {
        res.send({'token': await authenticateUser(req.body.email, req.body.password)});
    } catch (error) {
        console.error(error); // @todo Change to a proper logger
        res.status(401).send({message: label('authentication_failed')});
    }
}

export {
    authenticateAction
};