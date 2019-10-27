var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//---------------- Schema set up ---------------
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    {
        name: String,
        image: String,
        description: String
    }, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("NEWLY CREATED CAMPGROUND: ");
            console.log(campground);
        }
    }
);

//---------------- Routes ---------------

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
});

app.get("/campgrounds/:id", function (req, res) {
    var id = req.params.id;
    Campground.findById(id, function (err, element) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", { campground: element });
        }
    });
});

app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { campgrounds: allCampgrounds });
        }
    });
});

app.get("/", function (req, res) {
    res.render("landing");
})

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var img = req.body.image;
    var description = req.body.description;
    var newCampground = { name: name, image: img, description: description };
    Campground.create(newCampground, function (err, newlyCreatedCampground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});


var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function () {
    console.log("YelpCamp is running!");
});