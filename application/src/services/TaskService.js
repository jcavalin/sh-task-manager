import TaskRepository from "../repositories/TaskRepository.js";
import UserService from "./UserService.js";
import label from "../config/labelConfig.js";
import { manager } from "../config/roleConfig.js";

export default class TaskService {

    constructor() {
        this.repository = new TaskRepository();
    }

    findAll(tokenInfo) {
        return this.repository.findAll(tokenInfo.role === manager ? null : tokenInfo.email);
    }

    async create(task) {
        const userService = new UserService();
        const user = await userService.getByEmail(task.email);

        if (!user) {
            throw new Error(label('user_not_found'));
        }

        return this.repository.insert({
            summary: task.summary,
            date: task.date,
            user_id: user.id
        });
    }
}