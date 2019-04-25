const router = require('express').Router();

// Middleware
const authCheck = (req, res, next) => {
    if (!req.user) {
        // if user is not logged in
        res.redirect('/auth/login');
    } else {
        // if user is logged in
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    // res.send('You are logged in, this is your profile - ' + req.user.username);
    res.render('profile', {user: req.user});
});

module.exports = router;