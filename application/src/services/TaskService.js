import TaskRepository from "../repositories/TaskRepository.js";

export default class TaskService {

    constructor() {
        this.repository = new TaskRepository();
    }

    findAll() {
        return this.repository.select();
    }

    create(task) {
        return this.repository.insert(task);
    }
}