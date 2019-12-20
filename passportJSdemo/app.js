var express                 = require("express"),
    mongoose                = require ("mongoose", { useUnifiedTopology: true });
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/passportJSdemo", {useNewUrlParser: true} );

var app = express();
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.render("home");
})

app.get("/secret", function(req, res) {
    res.render("secret");
})

var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function () {
    console.log("server started......");
});

// app.listen(process.env.port, process.env.ID, function() {
//     console.log("server started.............")
// });