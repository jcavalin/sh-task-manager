import {fetchRow, executeQuery} from "../helpers/database.js";
import {managerRole} from "../helpers/role.js";

function getUserByEmail(email) {
    return fetchRow("SELECT id, email, password, role FROM app.user WHERE email = ?", [email]);
}

async function getManagersEmail() {
    const result = await executeQuery("SELECT email FROM app.user WHERE role = ?", [managerRole]);
    return result.map(user => user.email);
}

export {
    getUserByEmail,
    getManagersEmail
}