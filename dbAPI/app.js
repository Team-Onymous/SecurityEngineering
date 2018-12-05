let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let query = require("./queries.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let routes = require("./routes/routes.js")(app);

let server = app.listen(3000, function () {

    console.log(query)
    console.log("Listening on port %s...", server.address().port);
});