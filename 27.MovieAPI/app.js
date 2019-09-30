var express = require("express");
var app = express(); 
var request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("search");
});

app.get("/results", function(req, res) {
    var queryResult = req.query.search;
    request("http://www.omdbapi.com/?s=" + queryResult + "&apikey=thewdb", function(error, response, body) {
        if(!error && response.statusCode == 200) {
           var data = JSON.parse(body); 
            // res.send(data);
            res.render("results", {varData: data});
        }
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function()  {
    console.log("Movie App has started!!");
});