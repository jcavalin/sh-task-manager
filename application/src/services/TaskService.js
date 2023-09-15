import TaskRepository from "../repositories/TaskRepository.js";
import UserService from "./UserService.js";
import labelConfig from "../config/labelConfig.js";
import roleConfig from "../config/roleConfig";

export default class TaskService {

    constructor() {
        this.repository = new TaskRepository();
    }

    findAll(tokenInfo) {
        if (tokenInfo.role === roleConfig.manager) {
            return this.repository.getAll();
        }

        return this.repository.getByUser(tokenInfo.user_id);
    }

    async create(task) {
        const userService = new UserService();
        const user = await userService.getByEmail(task.email);

        if (!user) {
            throw new Error(labelConfig.user_not_found);
        }

        return this.repository.insert({
            summary: task.summary,
            date: task.date,
            user_id: user.id
        });
    }
}