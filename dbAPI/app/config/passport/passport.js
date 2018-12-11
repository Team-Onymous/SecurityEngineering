//load bcrypt
var bCrypt = require('bcrypt-nodejs');


module.exports = function (passport, user) {

    const User = user;

    const LocalStrategy = require('passport-local').Strategy;

//serialize
    passport.serializeUser(function (user, done) {

        done(null, user.id);
    });

    // deserialize user
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);

            }
        });
    });


    passport.use('register', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            date_of_birth: 'date_of_birth',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },


        function (req, email, password, done) {

            const generateHash = function (password) {

                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

            };

            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {

                if (user) {

                    return done(null, false, {
                        message: 'That email is already taken'
                    });

                } else {

                    var userPassword = generateHash(password);

                    var data =

                        {
                            email: email,

                            password: userPassword,

                            firstname: req.body.firstname,

                            lastname: req.body.lastname,
                            date_of_birth: req.body.date_of_birth

                        };


                    User.create(data).then(function (newUser, created) {

                        if (!newUser) {

                            return done(null, false, {message: 'bad password'});

                        }

                        if (newUser) {
                            console.log('Gelukt!');
                            console.log(newUser);
                            return done(null, newUser, {message: 'User created'});

                        }
                    });
                }
            });
        }
    ));

    //LOCAL SIGNIN
    passport.use('login', new LocalStrategy(
        {

            // by default, local strategy uses username and password, we will override with email

            usernameField: 'email',

            passwordField: 'password',

            passReqToCallback: true // allows us to pass back the entire request to the callback

        },


        function (req, email, password, done) {

            var User = user;

            var isValidPassword = function (userpass, password) {

                return bCrypt.compareSync(password, userpass);

            };

            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {

                if (!user) {

                    return done(null, false, {
                        message: 'Email does not exist'
                    });

                }

                if (!isValidPassword(user.password, password)) {

                    return done(null, false, {
                        message: 'Incorrect password.'
                    });

                }


                var userinfo = user.get();
                console.log(userinfo);
                return done(null, userinfo);


            }).catch(function (err) {

                console.log("Error:", err);

                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });

            });


        }
    ));

    // orderCard
    passport.use('orderCard', new LocalStrategy(
        {
            usernameField: 'email',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (req, email, password, done) {

            var User = user;

            console.log('begin');
            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                console.log('net na de then');
                let makeID = function () {
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                    for (var i = 0; i < 10; i++)
                        text += possible.charAt(Math.floor(Math.random() * possible.length));

                    return text;
                };

                console.log('net na makeID functie');
                console.log(user);
                let data =
                    {
                        pass_id: makeID(),
                        street: req.body.street,
                        postal_code: req.body.postal_code,
                        city: req.body.city
                    };

                console.log('voor de update functie');

                User.update(data, {where: {id: user.id}}).then(function () {
                    console.log('in de update functie');

                    var userinfo = user.get();
                    // // console.log(userinfo);
                    // return done(null, userinfo);

                    return done(null, userinfo, {message: 'User updated!'});

                });

                console.log(user);
                var userinfo = user.get();
                // // console.log(userinfo);
                return done(null, userinfo);

            }).catch(function (err) {

                console.log("Error:", err);

                return done(null, false, {
                    message: 'Something went wrong with the order of the card'
                });

            });


        }
    ));

};