var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function (req, res) {
    res.render("landing");
})

// AUTH ROUTES

//Show sign up form
router.get("/register", function (req, res) {
    res.render("register");
});

//handling sign up logic
router.post("/register", function (req, res) {
    req.body.username
    req.body.password
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('register'); //stops callback
        }
        passport.authenticate("local")(req, res, function () { //local would be "facebook" if we wanted fb auth
            res.redirect("/dogs");
        });
    });
});

//LOGIN ROUTES
router.get("/login", function (req, res) {
    res.render("login");
})

//login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/dogs",
    failureRedirect: "/login"
}), function (req, res) { }
);

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;