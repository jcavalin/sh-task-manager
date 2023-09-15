import Database from "../helpers/Database.js";

export default class TaskRepository {

    constructor() {
        this.db = new Database();
    }

    select() {
        return this.db.execute(
            "SELECT id, summary, date, created_at, updated_at, user_id FROM app.task ORDER BY created_at DESC"
        );
    }

    insert(task) {
        return this.db.insert(
            'app.task',
            ['summary', 'date', 'user_id'],
            [task.summary, task.date, task.user_id]
        );
    }
}