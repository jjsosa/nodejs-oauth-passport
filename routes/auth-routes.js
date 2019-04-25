const router = require('express').Router();
const passport = require('passport');

// Auth login
router.get('/login', (req, res) => {
    res.render('login', {user: req.user});
});

// Auth logout
router.get('/logout', (req, res) => {
    //handle with passport
    req.logout();
    res.redirect('/');
});

// Auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// Callback route for google to redirect to
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    // res.send('you reached the callback URI');

    // Print 'profile' received in passport callback
    // res.send(req.user);

    res.redirect('/profile');
})

module.exports = router;