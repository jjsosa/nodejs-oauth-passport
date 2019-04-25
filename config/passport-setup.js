const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user');

passport.use(
    new GoogleStrategy({
        //options for the Google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('passport callback fired');
        // console.log(profile);

        User.findOne({googleId: profile.id}).then((currentUser) => {
            if (!currentUser) {
                // if not, create user in database
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => {
                    console.log('New user creater: ' + newUser);
                });
            }
        });
    })
);