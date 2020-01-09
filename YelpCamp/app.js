var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Dog         = require("./models/dog"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds.js");

var commentRoutes = require("./routes/comments"),
    dogRoutes = require("./routes/dogs"),
    indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp6", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I miss my dog Rusty",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware so that this function is in every route
//req.user will be available inside every route.
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    //because this is a middleware, without next() everything will stop
    next();
})

app.use("/", indexRoutes);
app.use("/dogs/", dogRoutes);
app.use("/dogs/:id/comments/", commentRoutes);

var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function () {
    console.log("DogCamp is running!");
});