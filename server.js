// modules =================================================
const express = require('express');
const app = express();
// set our port
const port = 3000;
app.get('/', (req, res) => res.send('Welcome to Tutorialspoint!'));

// startup our app
app.listen(process.env.PORT || port, ()=> console.log(`Example app listening on port ${port}!`));