import {executeQuery, fetchOne, insert} from '../helpers/database.js'

function findAllTasks(userEmail) {
    let where = '';
    let parameters = [];
    if (userEmail) {
        where = 'WHERE user.email = ?';
        parameters.push(userEmail);
    }

    return executeQuery(
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

function getTaskById(id) {
    return fetchOne(
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

async function insertTask(task) {
    const id = await insert(
        'app.task',
        ['summary', 'date', 'user_id'],
        [task.summary, task.date, task.user_id]
    );

    return getTaskById(id);
}

export {
    findAllTasks,
    getTaskById,
    insertTask
}