import mysql from 'mysql2/promise';
import databaseConfig from "../config/databaseConfig.js";

function connection() {
    return mysql.createConnection(databaseConfig);
}

async function executeQuery(sql, parameters) {
    const con = await connection();
    const [results] = await con.execute(sql, parameters);

    return results;
}

async function insert(table, columns, values) {
    const placeholders = Array.from({length: columns.length}, () => '?').join(', ');
    const result = await executeQuery(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`, values);

    return result.insertId;
}

async function fetchOne(sql, parameters) {
    const result = await executeQuery(sql, parameters);
    // return the first result only
    return result.find(() => true);
}

export {
    executeQuery,
    insert,
    fetchOne
}