const mysql = require('mysql');

const config = require('../config');

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let connection;

function handleCon() {
    connection = mysql.createConnection(dbConfig);

    connection.connect(err => {
        if (err) {
            console.log('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });

    connection.on('error', err => {
        console.log('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        })
    })
}

function get(table, id) {
    let stringId = JSON.stringify(id);
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${stringId} `, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        })
    })
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        })
    })
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (error, result) => {
            if (error) return reject(error);
            resolve(result);
        })
    })
}

async function upsert(table, data) {
    let row = [];

    if (data.id) {
        row = await get(table, data.id);
    }

    if (row.length === 0) {
      return insert(table, data);
    } else {
      return update(table, data);
    }
}

function query(table, query, join) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (error, res) => {
            if (error) return reject(error);

            let stringResult = JSON.stringify(res[0]);
            let output = JSON.parse(stringResult);

            resolve(output, null);
        })
    });
}

module.exports = {
    list,
    get,
    upsert,
    query,
}