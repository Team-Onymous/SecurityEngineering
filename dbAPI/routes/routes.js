let appRouter = function(app) {

    app.get("/", function(req, res) {
        res.send("Hello World");
    });

    app.get("/bye", function(req, res) {
        res.send("Bye Bye!")
    });

    app.post("/getUser", function (req, res) {

        var account = {
            "username": req.username,
            "password": reqq.password
        }

        // sql query: SELECT * FROM security_lab.users WHERE username = username


    })
};

module.exports = appRouter;