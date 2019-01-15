var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var exphbs = require('express-handlebars');
const cors = require('cors');
const flash = require('connect-flash');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const corsOptions = {
    origin: 'http://localhost:8100',
    optionsSuccessStatus: 200
};

//Models
const models = require("./app/models");

app.use(cors(corsOptions));

app.use(flash());

//For BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


let dbAPI = new SequelizeStore({
    db: models.sequelize,
    table: 'session',
    expiration: 6 * 60 * 60 * 1000
});

// For Passport
app.use(session({
    secret: 'keyboard cat',
    store: dbAPI,
    resave: false,
    proxy: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000 // see below
    }
},)); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


//For Handlebars
app.set('views', './app/views');
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


app.get('/', function (req, res) {

    res.send('Welcome to Passport with Sequelize');

});

//Routes

const authRoute = require('./app/routes/auth.js')(app, passport, models);


//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user, flash);


//Sync Database
models.sequelize.sync().then(function () {

    console.log('Nice! Database looks fine')


}).catch(function (err) {

    console.log(err, "Something went wrong with the Database Update!")

});


app.listen(5000, function (err) {

    if (!err)

        console.log("Site is live");

    else console.log(err)

});