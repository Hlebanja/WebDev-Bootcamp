var bodyParser = require("body-parser"),
    express = require("express"),
    app = express(),
    mongoose = require("mongoose", { useUnifiedTopology: true });

mongoose.connect("mongodb://localhost/restful_routing_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
// app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});
var Blog = mongoose.model("Blog", blogSchema);


//RESTFUL ROUTES

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

app.get("/", function(req, res) {
    res.redirect("/blogs");
});

//PORT and SERVER RUNNING
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("SERVER IS RUNNING FOR BLOG!");
})