import TaskService from "../services/TaskService.js";
import labelConfig from "../config/labelConfig.js";

export default class TaskController {
    constructor() {
        this.service = new TaskService();
    }

    async listAction(req, res) {
        res.send(await this.service.findAll());
    }

    async createAction(req, res) {
        try {
            const id = await this.service.create({...req.body, ...req.token});
            res.send({id});
        } catch (error) {
            console.error(error); // @todo Change to a proper logger
            res.status(500).send({message: labelConfig.internal_error});
        }
    }
}