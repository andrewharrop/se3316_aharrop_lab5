/*
    Required dependancies:
        express
        passport
        body-parser
        mongoose
        
*/
const express = require('express');
const passport = require('passport');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const port = 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})