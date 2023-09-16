import {createTask, getTasks} from "../services/taskService.js";
import label from "../config/labelConfig.js";
import {validateCreateTask} from "./validators/taskValidator.js";

async function listTasksAction(req, res) {
    res.send(await getTasks(req.token));
}

async function createTaskAction(req, res) {
    try {
        const {error, value} = validateCreateTask(req.body);
        if (error) {
            res.status(400).send({message: error.message});
            return;
        }

        const id = await createTask({...value, ...req.token});
        res.send({id});
    } catch (error) {
        console.error(error); // @todo Change to a proper logger

        res.status(500).send({message: label('internal_error')});
    }
}

export {
    listTasksAction,
    createTaskAction
};