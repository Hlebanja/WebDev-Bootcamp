var express = require("express");
var app = express();

app.set("view engine", "ejs");

var port = process.env.PORT || 3000;
app.listen(port, function()  {
    console.log("Server listening PostRequestDemo!!");
});