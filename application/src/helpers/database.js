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

    const [results] = await connection.execute(sql, parameters.map((p) => String(p).toString()));
    pool.releaseConnection(connection);

    return results;
}

async function insert(table, columns, values) {
    const placeholders = Array.from({length: columns.length}, () => '?').join(', ');
    const result = await executeQuery(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`, values);

    return result.insertId;
}

async function fetchRow(sql, parameters) {
    const result = await executeQuery(sql, parameters);
    // return the first result only
    return result.find(() => true);
}

async function fetchPaginated(sql, parameters, page, limit) {
    page = page && parseInt(page) > 1 ? parseInt(page) : 1;
    limit = limit && parseInt(limit) > 0 ? parseInt(limit) : 10;
    const offset = (limit * page) - limit;

    const {total} = await fetchRow(`SELECT COUNT(1) AS total FROM (${sql}) t`, parameters);

    const paginateParameters = [...parameters];
    paginateParameters.push(limit);
    paginateParameters.push(offset);

    const data = await executeQuery(`${sql} LIMIT ? OFFSET ?`, paginateParameters);

    return {
        data,
        pagination: {
            total,
            limit,
            page: page,
            pages: total > 0 ? Math.ceil(total / limit) : 0
        }
    };
}

export {
    executeQuery,
    insert,
    fetchRow,
    fetchPaginated
}