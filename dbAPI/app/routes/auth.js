const authController = require('../controllers/authcontroller.js');


module.exports = function (app, passport) {

    // app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    app.post('/api/users/register', passport.authenticate('register'),
        function (req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            res.send({
                message: 'hooray',
                request: req.user
            });
        });

    app.get('/dashboard', isLoggedIn, authController.dashboard);


    app.get('/logout', authController.logout);

    app.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/dashboard',

            failureRedirect: '/signin'
        }
    ));

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/signin');

    }
};