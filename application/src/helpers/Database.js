import mysql from 'mysql2/promise';
import databaseConfig from "../config/databaseConfig.js";

export default class Database {
    async connection() {
        return await mysql.createConnection(databaseConfig);
    }

    async execute(sql, params) {
        const [results,] = await (await this.connection()).execute(sql, params);

        return results;
    }

    async insert(table, columns, values) {
        const placeholders = Array.from({length: columns.length}, () => '?').join(', ');

        const result = await this.execute(
            `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
            values
        );

        return result.insertId;
    }

}