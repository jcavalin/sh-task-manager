import {findAllTasks as repositoryFindAllTasks, insertTask} from "../repositories/taskRepository.js";
import {getUserByEmail} from "./userService.js";
import label from "../config/labelConfig.js";
import {manager} from "../config/roleConfig.js";

function findAllTasks(tokenInfo) {
    return repositoryFindAllTasks(tokenInfo.role === manager ? null : tokenInfo.email);
}

async function createTask(task) {
    const user = await getUserByEmail(task.email);

    if (!user) {
        throw new Error(label('user_not_found'));
    }

    return insertTask({
        summary: task.summary,
        date: task.date,
        user_id: user.id
    });
}

export {
    findAllTasks,
    createTask
}