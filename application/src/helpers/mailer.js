import {queueMessage} from "./queue.js";
import queueConfig from "../config/queueConfig.js";
import emailConfig from "../config/emailConfig.js";

function asyncSendMail(subject, body, to) {
    return queueMessage(
        queueConfig.notify_queue,
        {
            subject,
            body,
            to,
            from: emailConfig.from
        },
    );
}

export {
    asyncSendMail
}