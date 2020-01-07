var express = require("express");
var router = express.Router();
var Dog = require("../models/dog");

router.get("/new", function (req, res) {
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

router.post("/", function (req, res) {
    var name = req.body.name;
    var img = req.body.image;
    var description = req.body.description;
    var newDog = { name: name, image: img, description: description };
    Dog.create(newDog, function (err, newlyCreatedDog) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/dogs");
        }
    });
});

module.exports = router;