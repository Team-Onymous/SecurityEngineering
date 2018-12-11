const authController = require('../controllers/authcontroller.js');

module.exports = function (app, passport, models) {

    let User = models.user;
    let Consumable = models.consumable;
    let Transaction = models.transaction;

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
            res.send({
                message: 'Successfully logged in!',
                request: req.user.id
            });

        });

    app.put('/api/users/orderCard', isLoggedIn, passport.authenticate('orderCard', {failureRedirect: '/login'}),
        function (req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            res.send({
                message: 'Card successfully ordered',
            });

        });

    // get all users
    app.get('/api/users', isLoggedIn, (req, res) => {
        User.findAll().then(users => res.json(users)).catch(err => res.json(err));
    });

    // find current logged in user
    app.get('/api/users/currentUser', isLoggedIn, (req, res) => {
        User.findOne({where: {id: req.user.id}}).then(user => res.json(user)).catch(err => res.json(err));
    });

    //find specific user by ID
    app.get('/api/users/:id', isLoggedIn, (req, res) => {
        User.findOne({where: {id: req.params.id}}).then(user => res.json(user)).catch(err => res.json(err));

    });

    //find transactions per specific user
    app.get('/api/transactions/currentUser', isLoggedIn, (req, res) => {
        Transaction.findAll({where: {user_id: req.user.id}}).then(user => res.json(user)).catch(err => res.json(err));
    });

    //find transactions per specific user
    app.get('/api/transactions/:user_id', isLoggedIn, (req, res) => {
        Transaction.findAll({where: {user_id: req.params.user_id}}).then(user => res.json(user)).catch(err => res.json(err));
    });

    //find all consumables
    app.get('/api/consumables', isLoggedIn, (req, res) => {
        Consumable.findAll().then(user => res.json(user)).catch(err => res.json(err));
    });


    app.get('/dashboard', isLoggedIn, authController.dashboard);

    app.get('/logout', authController.logout);

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/signin');

    }
};