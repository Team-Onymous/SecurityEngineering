const authController = require('../controllers/authcontroller.js');

module.exports = function (app, passport, models) {

    let User = models.user;

    app.post('/api/users/register', passport.authenticate('register', {failureRedirect: '/register'}),
        function (req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            res.send({
                message: 'User successfully created!',
                request: req.user
            });

        });

    app.post('/api/users/login', passport.authenticate('login', {failureRedirect: '/login'}),
        function (req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            // console.log(res.userinfo);
            // console.log(user);
            res.send({
                message: 'Successfully logged in!',
                request: req.user.id
            });

        });

    app.put('/api/users/orderCard', isLoggedIn, passport.authenticate('orderCard', {failureRedirect: '/login'}),
        function (req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            console.log('it gets here');
            console.log(req);
            res.send({
                message: 'Card successfully ordered',
            });

        });

    app.get('/api/users', (req, res) => {
        User.findAll().then(users => res.json(users))
    });

    // find logged in user
    app.get('/api/users/currentUser', (req, res) => {

        User.findOne({where: {id: req.user.id}}).then(user => res.json(user));

    });


    app.get('/dashboard', isLoggedIn, authController.dashboard);


    app.get('/logout', authController.logout);

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/signin');

    }
};