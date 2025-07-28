const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const DB_HOSTNAME = process.env.DB_HOSTNAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_ROOT_PASSWORD = process.env.DB_ROOT_PASSWORD;
const DB_NAME = process.env.DB_NAME;

function createDBConnection() {
    const conn = mysql.createConnection({
        host: DB_HOSTNAME,
        user: DB_USERNAME,
        password: DB_ROOT_PASSWORD,
        database: DB_NAME
    });
    connectToDB(conn);

    return conn;
}

function connectToDB(conn) {
    conn.connect(function (err) {
        if (err) {
            throw err;
        }
        console.log(`Connected to the database ${conn.config.database}`);
    });
}

function checkUserCredentials(conn, mail, password) {
    // Checking if user exists
    conn.query(`SELECT * FROM users WHERE email like ?`, [mail],function (err, result) {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        if (result.length > 0) {
            // Checking if password is correct
            conn.query(`SELECT password_hash FROM users WHERE email like ?`, [mail],function (err, result) {
                if (err) {
                    console.error('Error executing query:', err);
                    return;
                }
                if (result.length > 0) {
                    let hashedPassword = result[0].password_hash;
                    // Compare the password with the hashed password
                    bcrypt.compare(password, hashedPassword, function(err, result) {
                        if (err) {
                            console.error('Error comparing passwords:', err);
                            return;
                        }
                        if (result) {
                            console.log('Haslo poprawne');
                            return true;

                        } else {
                            console.log('Haslo niepoprawne');
                            return false;
                        }
                    });
                } 
            });
        } else {
            console.log('Podany uzytkownik nie istnieje');
            return;
        }
    });
}


module.exports = {
    createDBConnection,
    checkUserCredentials
};
