const express = require('express');
const app = express();

// setup view engine
app.set('view engine', 'ejs');

// Create home route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('App now listening request on port 3000');
});