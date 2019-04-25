const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

// Set up view engine
app.set('view engine', 'ejs');

// Connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('Connection with MongoDB established');
});

// Set up routes
app.use('/auth', authRoutes);

// Create home route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('App now listening request on port 3000');
});