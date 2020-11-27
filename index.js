/*
    Required dependancies:
        express
        passport
        body-parser
        mongoose
        path
        cors
*/

const path = require('path')
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors')

//Import routing modules
const users = require('./routes/users');
const admin = require('./routes/admins');
const public = require('./routes/public');

const config = require('./config/database')

//Connect to DB
mongoose.connect(config.database, { useUnifiedTopology: true })


//Express routing
const app = express();

//Configure cors
app.use(cors())

//Routing based on status
app.use('/secure', users);
app.use('/admin', admin);

//app.use('/admin', admin);
//app.use('/public', public);

//Configuration for deployment.  Generated dist must be placed in here
app.use(express.static(path.join(__dirname, "public")));



//Port to listen from
const port = 3000;

//Request handling middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Test case
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});
//create three routes: admin, users, and unauthenticated


//Listen on port
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})