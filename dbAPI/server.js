const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
var env = require('dotenv').load();
var exphbs = require('express-handlebars')

//Routes
var authRoute = require('./app/routes/auth.js')(app);

//For BodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// For Passport

app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true})); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

app.get('/', function (req, res) {

    res.send('Welcome to Passport with Sequelize');

});

//Models
var models = require("./app/models");

//Sync Database
models.sequelize.sync().then(function () {

    console.log('Nice! Database looks fine')

}).catch(function (err) {

    console.log(err, "Something went wrong with the Database Update!")

});

//For Handlebars
app.set('views', './app/views');
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.listen(5000, function (err) {

    if (!err)
        console.log("API is live");
    else console.log(err)

});