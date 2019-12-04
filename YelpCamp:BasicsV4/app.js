var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Dog = require("./models/dog"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds.js");

mongoose.connect("mongodb://localhost/yelp_camp3");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

seedDB();

// Dog.create(
//     {
//         name: String,
//         image: String,
//         description: String
//     }, function (err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     }
// );

//---------------- Routes ---------------

app.get("/dogs/new", function (req, res) {
    res.render("dogs/new");
});

app.get("/dogs/:id/comments", function(req, res) {
    Dog.findById(req.params.id, function(err, foundDog) {
        if (err) {
            console.log(err);;
        } else {
            res.render("comments/comments");
        }
    });
});

app.get("/dogs/:id", function (req, res) {
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

app.get("/dogs", function (req, res) {
    Dog.find({}, function (err, allDogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { dogs: allDogs });
        }
    });
});

app.get("/", function (req, res) {
    res.render("landing");
})

app.post("/dogs", function (req, res) {
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

var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function () {
    console.log("DogCamp is running!");
});