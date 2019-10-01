var express = require("express");
var app = express();

app.set("view engine", "ejs");


app.get("/campgrounds", function(req, res) {
    var campgrounds = [
        {name: "Bahamas", image: "https://images.unsplash.com/flagged/photo-1557899775-24a0957d3895?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
        {name: "Cuba", image: "https://images.unsplash.com/photo-1500227847605-f84f994a25c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
        {name: "Greece", image: "https://images.unsplash.com/photo-1489901993807-2997b46144f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
    ];
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.get("/", function(req, res) {
    res.render("landing");
})



var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function() {
    console.log("YelpCamp is running!");
});