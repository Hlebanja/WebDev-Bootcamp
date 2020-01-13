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

router.get("/:comment_id/edit", checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if(err) {
            console.log(err)
            res.redirect("back");
        } else {
            res.render("comments/edit.ejs", { comment: foundComment, dogID: req.params.id });
        }
    });
});

// app.use("/dogs/:id/comments/", commentRoutes);
router.put("/:comment_id", function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/dogs/" + req.params.id);
        }

    });
});

router.delete("/:comment_id", checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err, foundComment) {
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/dogs/" + req.params.id);
        }
    });
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
 
function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                console.log(err);
                res.redirect("back");
            } else {
                //owns comment?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    console.log("user not authorized");
                    res.redirect("back");
                }
            }
        });
    } else {
        console.log("User not logged in");
        res.redirect("back");
    }
}

module.exports = router;