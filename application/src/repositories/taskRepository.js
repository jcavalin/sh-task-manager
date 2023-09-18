import {fetchPaginated, fetchRow, insert} from '../helpers/database.js'

async function fetchTasksPaginated(userEmail, page, limit) {
    let where = '';
    let parameters = [];
    if (userEmail) {
        where = 'WHERE user.email = ?';
        parameters.push(userEmail);
    }

    return fetchPaginated(
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
        parameters,
        page,
        limit
    );
}

function fetchTaskById(id) {
    return fetchRow(
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
function fetchTaskByUid(uid) {
    return fetchRow(
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
                  task.uid = ?`,
        [uid]
    );
}

function insertTask(task) {
    return insert(
        'app.task',
        ['summary', 'date', 'user_id'],
        [task.summary, task.date, task.user_id]
    );
}

export {
    fetchTasksPaginated,
    fetchTaskById,
    fetchTaskByUid,
    insertTask
}