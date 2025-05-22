const mysql = require('mysql');


let mail = 'kamil_suwiczak';
let password = 'Ka1mil';

module.exports = function (app) {
    const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'uzytkownicy'
    });

    conn.connect(function (err) {
    if(err){
        throw err;
    }
    console.log(`Connected to the database ${conn.config.database}`);
    });

    const sql = `SELECT * FROM uzytkownicy WHERE email like \'${mail}\' AND haslo like \'${password}\'`;
    
    conn.query(sql, function (err, result) {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        if (result.length > 0) {
            console.log('User found:', result[0]);
            app.route('/login')
                .get(function (req, res) {
            res.send('Login page');
                });
        } else {
            console.log('Wrong email or password.');
            return;
        }
    });


    
}







