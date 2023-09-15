import TaskService from "../services/TaskService.js";
import label from "../config/labelConfig.js";

const listTasks = async (req, res) => {
    const service = new TaskService();

    res.send(await service.findAll(req.token));
};

const createTask = async (req, res) => {
    try {
        const service = new TaskService();
        const id = await service.create({...req.body, ...req.token});

        res.send({id});
    } catch (error) {
        console.error(error); // @todo Change to a proper logger

        res.status(500).send({message: label('internal_error')});
    }
};

export {
    listTasks,
    createTask
};