import express from 'express';
import { createDBConnection } from './db.js';
import { checkUserCredentials } from './login.js';
import { registerUser } from './register.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;

app.post('/login', (req, res) => {
    res.send('Login page\n');       // TODO: no need to send page, just generate and send JWT token
    const {email, password} = req.body;
    const conn = createDBConnection();
    checkUserCredentials(conn, email, password);
});

app.post('/register', async (req, res) => {
    const {email, password} = req.body;
    const conn = createDBConnection();
    await registerUser(conn, email, password);
    res.send("registered\n");
});

app.get("/test", (req, res) => {
    const conn = createDBConnection();
    conn.query(`SELECT * FROM users`, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        for(const res of result) {
            console.log(res);
        }
    });
    res.send("");
});

app.listen(port);
console.log(`Server is running on port ${port}`);
