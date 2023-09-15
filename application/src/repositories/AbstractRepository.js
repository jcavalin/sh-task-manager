import Database from "../helpers/Database.js";

export default class AbstractRepository {

    constructor() {
        this.db = new Database();
    }
}