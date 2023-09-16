import {fetchOne, executeQuery} from "../helpers/database.js";
import {manager} from "../config/roleConfig.js";

function getUserByEmail(email) {
    return fetchOne("SELECT id, email, password, role FROM app.user WHERE email = ?", [email]);
}

async function getManagersEmails() {
    const result = await executeQuery("SELECT email FROM app.user WHERE role = ?", [manager]);
    return result.map(user => user.email);
}

export {
    getUserByEmail,
    getManagersEmails
}