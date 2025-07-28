const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

let login = require('./login.js');

app.get('/login', (req, res) => {
    res.send('Login page');
    let mail = 'marcin_kaczor';
    let password = 'Marcin123';
    login.checkUserCredentials(login.createDBConnection(), mail, password);
});

app.listen(port);
console.log(`Server is running on port ${port}`);
