import {fetchTaskById, fetchTasks, insertTask} from "../repositories/taskRepository.js";
import {getUserByEmail} from "./userService.js";
import label from "../helpers/label.js";
import {isManagerUser} from "../helpers/role.js";
import mailer from "../../src/helpers/mailer.js";
import {getManagersEmails} from "../repositories/userRepository.js";
import logger from "../helpers/logger.js";

async function getTasks(email) {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error(label('user_not_found'));
    }

    const result = await fetchTasks(isManagerUser(user) ? null : user.email);
    return result.map(formatTaskToReturn);
}

async function getTaskById(id) {
    const task = await fetchTaskById(id);

    return formatTaskToReturn(task);
}

function formatTaskToReturn(task) {
    task.date = new Date(task.date).toISOString().slice(0, 10);

    return task;
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

    const taskCreated = await getTaskById(id);

    notifyMangersNewTask({...taskCreated}).then(
        () => logger.info("Notification queued"),
        (error) => logger.error(error.message)
    );

    return formatTaskToReturn(taskCreated);
}

async function notifyMangersNewTask(task) {
    task = formatTaskToReturn(task);
    task = obfuscatePrivateData(task);

    const emails = await getManagersEmails();
    const id = task.id.split('-')[0];
    const message = `
        The tech "${task.technician}" performed a new the task on date "${task.date}".

        Summary:
        ${task.summary}
    `;

    return mailer.asyncSendMail(
        `Task #${id} has been created`,
        message,
        emails
    );
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