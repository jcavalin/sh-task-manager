import {createTask, getTasksList} from "../services/taskService.js";
import label from "../helpers/label.js";
import {validateCreateTask} from "./validators/taskValidator.js";
import {validatePagination} from "./validators/paginationValidator.js";
import logger from "../helpers/logger.js";

async function listTasksAction(req, res) {
    try {
        const {error, value} = validatePagination(req.query);
        if (error) {
            res.status(400).send({message: error.message});
            return;
        }

        res.send(await getTasksList(req.token.email, value.page, value.limit));
    } catch (error) {
        logger.error(error.message);

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

        res.status(201).send(await createTask({...value, ...req.token}));
    } catch (error) {
        logger.error(error.message);

        res.status(500).send({message: label('internal_error')});
    }
}

export {
    listTasksAction,
    createTaskAction
};