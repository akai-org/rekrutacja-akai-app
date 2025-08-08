import bcrypt from 'bcrypt';

export function checkUserCredentials(mail, password) {
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
