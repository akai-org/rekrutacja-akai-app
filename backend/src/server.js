import dotenv from 'dotenv'; dotenv.config();
import express from 'express';
import { createDBConnection } from './db.js';
import { checkUserCredentials } from './login.js';
import { registerUser } from './register.js';

const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;

app.post('/login', (req, res) => {
    res.send('Login page\n');       // TODO: no need to send page, just generate and send JWT token
    const {email, password} = req.body;
    checkUserCredentials(email, password);
});

app.post('/register', async (req, res) => {
    const {email, password} = req.body;
    await registerUser(email, password);
    res.send("registered\n");
});

app.listen(port, async () => {
    dotenv.config();
    await createDBConnection();
    console.log(`Server is running on port ${port}`);
});
