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
                            date_of_birth: req.body.date_of_birth,
                            role: 0
                        };

                    User.create(data).then(function (newUser, created) {

                        // if (!newUser) {
                        //     return done(null, false, {message: 'Something went wrong, try again'});
                        // }

                        if (newUser) {
                            return done(null, newUser, {message: 'User created'});
                        }
                    }).catch(err => {
                        return done(null, false, err)
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
                        message: 'Email does not exist or password incorrect'
                    });
                }

                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'Email does not exist or password incorrect.'
                    });
                }

                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function (err) {

                console.log("Error:", err);

                return done(null, false, {
                    message: 'Something went wrong with your Signin',
                    error: err
                });

            });
        }
    ));
};