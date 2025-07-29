import bcrypt from 'bcrypt';
const rounds = 10;

export async function registerUser(conn, mail, password) {
    bcrypt.hashSync(password, rounds, async (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            return;
        }
        conn.query(`INSERT INTO users (email, password_hash) VALUES (?, ?);`, [mail, hash], (err, res) => {
            if (err) {
                console.error('Error executing query:', err);
                return;
            }
        });
    });
}
