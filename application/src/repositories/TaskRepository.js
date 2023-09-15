import AbstractRepository from "./AbstractRepository.js";

export default class TaskRepository extends AbstractRepository {
    findAll(userEmail) {
        let where = '';
        let parameters = [];
        if (userEmail) {
            where = 'WHERE user.email = ?';
            parameters.push(userEmail);
        }

        return this.db.execute(
            `SELECT 
                    task.uid AS id, 
                    task.summary, 
                    task.date, 
                    task.created_at, 
                    task.updated_at, 
                    user.email AS technician
                FROM 
                    app.task task
                INNER JOIN
                    app.user user ON task.user_id = user.id
                ${where}
                ORDER BY 
                    created_at DESC`,
            parameters
        );
    }

    byId(id) {
        return this.db.fetchOne(
                `SELECT 
                        task.uid AS id,
                        task.summary,
                        task.date,
                        task.created_at,
                        task.updated_at,
                        user.email AS technician
                    FROM 
                      app.task task
                    INNER JOIN
                      app.user user ON task.user_id = user.id
                    WHERE 
                      task.id = ?`,
            [id]
        );
    }

    async insert(task) {
        const id = await this.db.insert(
            'app.task',
            ['summary', 'date', 'user_id'],
            [task.summary, task.date, task.user_id]
        );

        return this.byId(id);
    }
}