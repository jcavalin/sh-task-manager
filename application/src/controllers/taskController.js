import {createTask, getTasks} from "../services/taskService.js";
import label from "../helpers/label.js";
import {validateCreateTask} from "./validators/taskValidator.js";

async function listTasksAction(req, res) {
    try {
        res.send(await getTasks(req.token.email));
    } catch (error) {
        console.error(error); // @todo Change to a proper logger

        res.status(500).send({message: label('internal_error')});
    }
}

async function createTaskAction(req, res) {
    try {
        const {error, value} = validateCreateTask(req.body);
        if (error) {
            res.status(400).send({message: error.message});
            return;
        }

        res.send(await createTask({...value, ...req.token}));
    } catch (error) {
        console.error(error); // @todo Change to a proper logger

        res.status(500).send({message: label('internal_error')});
    }
}

export {
    listTasksAction,
    createTaskAction
};