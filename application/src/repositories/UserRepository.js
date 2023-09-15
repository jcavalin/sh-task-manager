import Database from "../helpers/Database.js";
import AbstractRepository from "./AbstractRepository.js";

export default class UserRepository extends AbstractRepository{

    selectOne(email) {
        return this.db.fetchOne(
            "SELECT id, email, password, role FROM app.user WHERE email = ?",
            [email]
        );
    }
}