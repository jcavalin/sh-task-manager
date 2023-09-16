import {fetchOne, executeQuery} from "../helpers/database.js";
import {managerType} from "../helpers/role.js";

function getUserByEmail(email) {
    return fetchOne("SELECT id, email, password, role FROM app.user WHERE email = ?", [email]);
}

async function getManagersEmails() {
    const result = await executeQuery("SELECT email FROM app.user WHERE role = ?", [managerType]);
    return result.map(user => user.email);
}

export {
    getUserByEmail,
    getManagersEmails
}