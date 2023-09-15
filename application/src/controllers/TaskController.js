import TaskService from "../services/TaskService.js";

export default class TaskController {
    constructor() {
        this.service = new TaskService();
    }

    async listAction(req, res) {
        res.send(await this.service.findAll());
    }

    async createAction(req, res) {
        res.send({'id': await this.service.create(req.body)});
    }
}