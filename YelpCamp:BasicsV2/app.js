var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//---------------- Schema set up ---------------
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    {
        name: "Bahamas", 
        image: "https://images.unsplash.com/flagged/photo-1557899775-24a0957d3895?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    }, function(err, campground) {
        if(err){
            console.log(err);
        } else {
            console.log("NEWLY CREATED CAMPGROUND: ");
            console.log(campground);
        }
    }
); 

//---------------- Routes ---------------

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds:allCampgrounds});
        }
    });
});

app.get("/", function(req, res) {
    res.render("landing");
})

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var img = req.body.image;
    var newCampground = {name: name, image: img};
    Campground.create(newCampground, function(err, newlyCreatedCampground){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");
        }
    });
});

var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function() {
    console.log("YelpCamp is running!");
});