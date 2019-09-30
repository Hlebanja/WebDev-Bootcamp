var express = require("express");
var app = express(); 
var request = require("request");

app.set("view engine", "ejs");

app.get("/results", function(req, res) {
    request("http://www.omdbapi.com/?s=iowa&apikey=thewdb", function(error, response, body) {
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