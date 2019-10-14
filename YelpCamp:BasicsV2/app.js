var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
    {name: "Bahamas", image: "https://images.unsplash.com/flagged/photo-1557899775-24a0957d3895?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name: "Cuba", image: "https://images.unsplash.com/photo-1500227847605-f84f994a25c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name: "Greece", image: "https://images.unsplash.com/photo-1489901993807-2997b46144f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name: "Bahamas", image: "https://images.unsplash.com/flagged/photo-1557899775-24a0957d3895?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name: "Cuba", image: "https://images.unsplash.com/photo-1500227847605-f84f994a25c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name: "Greece", image: "https://images.unsplash.com/photo-1489901993807-2997b46144f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name: "Bahamas", image: "https://images.unsplash.com/flagged/photo-1557899775-24a0957d3895?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name: "Cuba", image: "https://images.unsplash.com/photo-1500227847605-f84f994a25c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name: "Greece", image: "https://images.unsplash.com/photo-1489901993807-2997b46144f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.get("/", function(req, res) {
    res.render("landing");
})

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var img = req.body.image;
    var newCampground = {name: name, image: img};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function() {
    console.log("YelpCamp is running!");
});