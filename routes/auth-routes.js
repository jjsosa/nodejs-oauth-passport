const router = require('express').Router();

// Auth login
router.get('/login', (req, res) => {
    res.render('login');
});

// Auth logout
router.get('/logout', (req, res) => {
    //handle with passport
    res.send('Logging out');
});

// Auth with google
router.get('/google', (req, res) => {
    // handle with passport
    res.send('Logging in with google');
});

module.exports = router;