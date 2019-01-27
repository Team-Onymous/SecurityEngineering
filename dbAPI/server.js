const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey  = fs.readFileSync('sslcert/privkey.pem', 'utf8');
const certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const env = require('dotenv').load();
const exphbs = require('express-handlebars');
const cors = require('cors');
const flash = require('connect-flash');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const corsOptions = {
//     origin: 'https://onycoin.nl',
//     optionsSuccessStatus: 200
// };

const corsOptions = {
    origin: ['http://localhost:8100', 'https://onycoin.nl', "http://localhost"],
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

// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    proxy: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000 // see below
    }
})); // session secret
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

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// switch to https for production
httpServer.listen(5000, function (err) {

    if (!err)

        console.log("Site is live");

    else console.log(err)

});
