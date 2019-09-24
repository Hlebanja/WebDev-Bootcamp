var express = require("express");
var app = express();


app.get("/", function (req, res) {
    res.send("Hi there. Welcome to my assignment!");
});

app.get("/speak/:animal", function (req, res) {
    var animal = req.params.animal.toLocaleLowerCase();
    var sounds = {
        pig: "Oink",
        dog: "Woof Woof",
        cow: "Moo"
    }
    var sound = sounds[animal];
    res.send("The " + animal + " says " + sound + "!");
});

app.get("/repeat/:word/:number", function (req, res) {
    var i = Number(req.params.number);
    var word = req.params.word;
    var responseString = "";

    for (var j = 0; j < i; j++) {
        responseString += (word + " ");
    }
    res.send(responseString);
});

app.get("*", function (req, res) {
    res.send("Invalid page address..What are you doing with your life?")
});

app.listen(3000, function () {
    console.log("Listening on port 3000 - serving express-assignment.")
})