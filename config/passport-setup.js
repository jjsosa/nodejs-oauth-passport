const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        //options for the Google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('passport callback fired');
        console.log(profile);

        User.findOne({googleId: profile.id}).then((currentUser) => {
            if (!currentUser) {
                // if not saved yet, create user in database
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile._json.picture
                }).save().then((newUser) => {
                    console.log('New user creater: ' + newUser);
                    done(null, newUser);
                });
            } else {
                // if user exists
                console.log('User is already saved in database');
                done(null, currentUser);
            }
        });
    })
);