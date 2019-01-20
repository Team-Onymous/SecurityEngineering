const authController = require('../controllers/authcontroller.js');

module.exports = function (app, passport, models, flash) {

    let User = models.user;
    let Consumable = models.consumable;
    let Transaction = models.transaction;

    app.post('/api/users/register', passport.authenticate('register'),
        function (req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            res.send({
                message: 'User successfully created!',
                request: req.user
            });
        });


    app.post('/api/users/login', passport.authenticate('login', {failureFlash: true}),
        function (req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            res.send({
                message: 'Successfully logged in!',
                id: req.user.id,
                wallet_address: req.user.wallet_address,
                wallet_key: req.user.wallet_key,
                email: req.user.email,
                firstname: req.user.firstname,
                lastname: req.user.lastname,
                // request: req.session
            })
        });

    app.post('/api/users/createTransaction', function (req, res) {

        let data = {
            tx_id: req.body.tx_id,
            token_amount: req.body.token_amount,
            incoming: req.body.incoming,
            order: req.body.order,
            user_id: req.body.user_id
        };

        Transaction.create(data).then((error, result) => {
            if (!error) {
                return result
            } else console.error(error);

            res.json({
                message: "Created a transaction!",
                tx_id: req.body.tx_id,
                token_amount: req.body.token_amount,
                incoming: req.body.incoming,
                order: req.body.order,
                user_id: req.body.user_id
            })

        }).catch(err => console.error(err))


    });

    app.put('/api/users/orderCard/:id',
        function (req, res) {

            User.findOne({where: {id: req.params.id}}).then(user => {
                // let makeID = function () {
                //     var text = "";
                //     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                //
                //     for (var i = 0; i < 10; i++)
                //         text += possible.charAt(Math.floor(Math.random() * possible.length));
                //
                //     return text; // TODO: check of pass_id al bestaat
                // };

                let data =
                    {
                        pass_id: req.body.pass_id,
                        street: req.body.street,
                        house_number: req.body.house_number,
                        postal_code: req.body.postal_code,
                        city: req.body.city
                    };

                //execute the update in DB
                User.update(data, {where: {id: user.id}});

                //callback
                res.json({
                    id: user.id,
                    pass_id: user.pass_id,
                    street: user.street,
                    house_number: user.house_number,
                    postal_code: user.postal_code,
                    city: user.city,
                    role: user.role
                });
            }).catch(err => res.json(err));
        });

// get all users
//     app.get('/api/users', isLoggedIn, (req, res) => {
//         User.findAll().then(users => res.json(users)).catch(err => res.json(err));
//     });

    // find current logged in user
    app.get('/api/users/currentUser', (req, res) => {
        //TODO: web3.js wallet info ophalen en meesturen in response
        User.findOne({where: {id: req.user.id}}).then(user => res.json({
            id: user.id,
            wallet_address: user.wallet_address,
            pass_id: user.pass_id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            date_of_birth: user.date_of_birth,
            role: user.role
        })).catch(err => res.json(err));
    });

    //find specific user by ID
    app.get('/api/users/:id', (req, res) => {
        //TODO: web3.js wallet info ophalen en meesturen in response
        User.findOne({where: {id: req.params.id}}).then(user => {
            res.json({
                id: user.id,
                wallet_address: user.wallet_address,
                wallet_key: user.wallet_key,
                pass_id: user.pass_id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                date_of_birth: user.date_of_birth,
                role: user.role
            })
        }).catch(err => res.json(err));
    });

    //find specific user by ID
    app.get('/api/users/pass/:pass_id', (req, res) => {
        //TODO: web3.js wallet info ophalen en meesturen in response
        User.findOne({where: {pass_id: req.params.pass_id}}).then(user => {
            res.json({
                id: user.id,
                wallet_address: user.wallet_address,
                wallet_key: user.wallet_key,
                pass_id: user.pass_id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                date_of_birth: user.date_of_birth,
                role: user.role
            })
        }).catch(err => res.json(err));
    });

    //find specific user by wallet address
    app.get('/api/users/:wallet_address', (req, res) => {
        //TODO: web3.js wallet info ophalen en meesturen in response
        User.findOne({where: {wallet_address: req.params.wallet_address}}).then(user => {
            res.json({
                id: user.id,
                wallet_address: user.wallet_address,
                pass_id: user.pass_id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                date_of_birth: user.date_of_birth,
                role: user.role
            })
        }).catch(err => res.json(err));
    });

    //find transactions per specific user
    app.get('/api/transactions/currentUser', (req, res) => {
        Transaction.findAll({where: {user_id: req.user.id}}).then(transactions => {

            let transactionsArray = [];
            for (let transaction of transactions) {
                let filteredTransaction = {
                    id: transaction.id,
                    tx_id: transaction.tx_id,
                    token_amount: transaction.token_amount,
                    incoming: transaction.incoming,
                    order: transaction.order,
                    createdAt: transaction.createdAt
                };
                transactionsArray.push(filteredTransaction);
            }

            res.json(transactionsArray)
        }).catch(err => res.json(err));
    });

    //find transactions per specific user
    app.get('/api/transactions/:id', (req, res) => {
        Transaction.findAll({where: {user_id: req.params.id}}).then(transactions => {

            let transactionsArray = [];
            for (let transaction of transactions) {
                let filteredTransaction = {
                    id: transaction.id,
                    tx_id: transaction.tx_id,
                    token_amount: transaction.token_amount,
                    incoming: transaction.incoming,
                    order: transaction.order,
                    createdAt: transaction.createdAt
                };
                transactionsArray.push(filteredTransaction);
            }

            res.json(transactionsArray)
        }).catch(err => res.json(err));
    });

//find all consumables
    app.get('/api/consumables', (req, res) => {
        Consumable.findAll().then(user => res.json(user)).catch(err => res.json(err));
    });

    app.get('/dashboard', authController.dashboard);

    app.get('/logout', authController.logout);

    // function isLoggedIn(req, res, next) {
    //
    //     if (req.isAuthenticated())
    //
    //         return next();
    //     res.status(401)
    //     res.send({
    //         message: 'You are currently not logged in, please log in before you continue'
    //     });
    //
    // }
}
;