var express = require("express");
var router = express.Router({ mergeParams: true }); //makes sure the :id from URL is passed as params
var Dog = require("../models/dog");
var Comment = require("../models/comment");

router.get("/new", isLoggedIn, function (req, res) {
    Dog.findById(req.params.id, function (err, foundDog) {
        if (err) {
            console.log(err);;
        } else {
            res.render("comments/new", { dog: foundDog });
        }
    });
});

router.post("/", isLoggedIn, function (req, res) {
    Dog.findById(req.params.id, function (err, foundDog) {
        if (err) {
            console.log(err);;
        } else {
            console.log(req.body.comment);
            Comment.create(req.body.comment, function (err, newComment) {
                if (err) {
                    console.log(err);
                } else {
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    foundDog.comments.push(newComment);
                    foundDog.save();
                    res.redirect("/dogs/" + foundDog._id);
                }
            });
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