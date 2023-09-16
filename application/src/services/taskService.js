import {fetchTaskById, fetchTasks, insertTask} from "../repositories/taskRepository.js";
import {getUserByEmail} from "./userService.js";
import label from "../config/labelConfig.js";
import {manager} from "../config/roleConfig.js";

function getTasks(tokenInfo) {
    return fetchTasks(tokenInfo.role === manager ? null : tokenInfo.email);
}

function getTaskById(id) {
    return fetchTaskById(id);
}

async function createTask(task) {
    const user = await getUserByEmail(task.email);

    if (!user) {
        throw new Error(label('user_not_found'));
    }

    const id = await insertTask({
        summary: task.summary,
        date: task.date,
        user_id: user.id
    });

    return getTaskById(id);
}

/**
 * Replace the content of <private> tags in the task summary by '*****'
 * @param task
 * @returns task
 */
function obfuscatePrivateData(task) {
    task.summary = task.summary.replace(/<private>.*?<\/private>/ig,'*****');
    return task;
}

export {
    getTasks,
    createTask
}