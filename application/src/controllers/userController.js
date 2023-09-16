import {authenticateUser} from "../services/userService.js";
import label from "../helpers/label.js";
import {validateAuthenticateUser} from "./validators/userValidator.js";

async function authenticateAction(req, res) {
    try {
        const {error, value} = validateAuthenticateUser(req.body);
        if (error) {
            res.status(400).send({message: error.message});
            return;
        }

        res.send({'token': await authenticateUser(value.email, value.password)});
    } catch (error) {
        // console.error(error); // @todo Change to a proper logger
        res.status(401).send({message: label('authentication_failed')});
    }
}

export {
    authenticateAction
};