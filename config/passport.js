const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const passport = require('passport');
const config = require('../config/database');
const User = require('../models/user');

module.exports = (passport) => {

    //Options for JWTStrategy
    let options = {};

    //Set values in options
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    options.secretOrKey = config.secret;

    //Configure passport. Findone is acceptable to use here, repititions must be dealt with elsewhere
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        User.findOne({ id: jwt_payload.sub }, (err, user) => {
            if (err) return done(err, false); //errors must be dealt with in a better way
            if (user) return done(null, user);
            else return done(null, false);
        })
    }))

}