import {createPool} from 'mysql2/promise';
import databaseConfig from "../config/databaseConfig.js";

let globalPool = null;

function poolConnection() {
    if (!globalPool) {
        globalPool = createPool(databaseConfig);
    }

    return globalPool;
}

async function executeQuery(sql, parameters) {
    const pool = await poolConnection();
    const connection = await pool.getConnection();

    const [results] = await connection.execute(sql, parameters);
    pool.releaseConnection(connection);

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