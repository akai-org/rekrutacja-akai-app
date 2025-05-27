const mysql = require('mysql2');
const bcrypt = require('bcrypt');

let mail = 'marcin_kaczor';
let password = 'Marcin123';

module.exports = function (app) {
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rootpass',
        database: 'akai-recruitment-app'
    });

    // Connect to the database
    conn.connect(function (err) {
        if(err){
            throw err;
        }
        console.log(`Connected to the database ${conn.config.database}`);
    });

    // Checking if user exists
    conn.query(`SELECT * FROM users WHERE email like \'${mail}\'`, function (err, result) {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        if (result.length > 0) {
            // Checking if password is exists
            conn.query(`SELECT password_hash FROM users WHERE email like \'${mail}\'`, function (err, result) {
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
                            // Endpoint for login
                            app.route('/login').get(function (req, res) {
                                res.send('Login page');
                            });
                        } else {
                            console.log('Haslo niepoprawne');
                            return;
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
