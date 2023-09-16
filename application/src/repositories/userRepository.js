import {fetchOne} from "../helpers/database.js";

function getUserByEmail(email) {
    return fetchOne("SELECT id, email, password, role FROM app.user WHERE email = ?", [email]);
}

export {
    getUserByEmail
}