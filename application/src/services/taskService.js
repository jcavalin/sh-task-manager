import {fetchTaskById, fetchTasks, insertTask} from "../repositories/taskRepository.js";
import {getUserByEmail} from "./userService.js";
import label from "../helpers/label.js";
import {isManagerUser} from "../helpers/role.js";
import {asyncSendMail} from "../helpers/mailer.js";
import {getManagersEmails} from "../repositories/userRepository.js";

function getTasks(tokenInfo) {
    return fetchTasks(isManagerUser(tokenInfo) ? null : tokenInfo.email);
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

    const taskCreated = await getTaskById(id);
    notifyMangersNewTask(taskCreated).then(
        () => console.log("Notification queued"),
        (error) => console.error(error)
    );

    return taskCreated;
}

async function notifyMangersNewTask(task) {
    const emails = await getManagersEmails();
    task = obfuscatePrivateData(task);

    const date = new Date(task.date).toISOString();
    const id = task.id.split('-')[0];
    const message = `
        The tech "${task.technician}" performed a new the task on date "${date}".

        Summary:
        ${task.summary}
    `;

    return asyncSendMail(
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