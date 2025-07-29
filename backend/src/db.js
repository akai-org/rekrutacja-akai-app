import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const DB_HOSTNAME = process.env.DB_HOSTNAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_ROOT_PASSWORD = process.env.DB_ROOT_PASSWORD;
const DB_NAME = process.env.DB_NAME;

export function createDBConnection() {
    const conn = mysql.createConnection({
        host: DB_HOSTNAME,
        user: DB_USERNAME,
        password: DB_ROOT_PASSWORD,
        database: DB_NAME
    });
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(`Connected to the database ${conn.config.database}`);
    });
    return conn;
}
