var express = require("express");
var router = express.Router();
var Dog = require("../models/dog");

router.get("/new", isLoggedIn, function (req, res) {
    res.render("dogs/new");
});

router.get("/:id", function (req, res) {
    var id = req.params.id;
    Dog.findById(id).populate("comments").exec(function (err, element) {
        if (err) {
            console.log(err);
        } else {
            console.log(element);
            res.render("dogs/show", { dog: element });
        }
    });
});

router.get("/", function (req, res) {
    Dog.find({}, function (err, allDogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("dogs/index", { dogs: allDogs });
        }
    });
});

router.post("/", isLoggedIn, function (req, res) {
    var name = req.body.name;
    var img = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newDog = { name: name, image: img, description: description, author: author };
    Dog.create(newDog, function (err, newDog) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/dogs");
        }
    });
});

router.get("/:id/edit", function (req, res) {
    Dog.findById(req.params.id, function (err, foundDog) {
        if (err) {
            console.log(err);
            res.redirect("/dogs");
        } else {
            res.render("dogs/edit.ejs", { dog: foundDog });
        }
    });
});

router.put("/:id", function (req, res) {

    Dog.findByIdAndUpdate(req.params.id, req.body.dog, function (err, updatedDog) {
        if (err) {
            console.log(err);
            res.redirect("/dogs");
        } else {
            res.redirect("/dogs/" + req.params.id);
        }

    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;