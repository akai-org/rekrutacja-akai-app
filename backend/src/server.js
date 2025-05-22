const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

let routes = require('./login.js');
routes(app);

app.listen(port);
console.log(`Server is running on port ${port}`);
