var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Dog = require("./models/dog"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds.js");

mongoose.connect("mongodb://localhost/yelp_camp6", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
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
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    //because this is a middleware, without next() everything will stop
    next();
})

console.log(__dirname);

// Dog.create(
//     {
//         name: String,
//         image: String,
//         description: String
//     }, function (err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     }
// );

//---------------- Routes ---------------

app.get("/dogs/new", function (req, res) {
    res.render("dogs/new");
});

app.get("/dogs/:id/comments/new", isLoggedIn, function (req, res) {
    Dog.findById(req.params.id, function (err, foundDog) {
        if (err) {
            console.log(err);;
        } else {
            res.render("comments/new", { dog: foundDog });
        }
    });
});

app.post("/dogs/:id/comments", isLoggedIn, function (req, res) {
    Dog.findById(req.params.id, function (err, foundDog) {
        if (err) {
            console.log(err);;
        } else {
            console.log(req.body.comment);
            Comment.create(req.body.comment, function (err, newComment) {
                if (err) {
                    console.log(err);
                } else {
                    foundDog.comments.push(newComment);
                    foundDog.save();
                    res.redirect("/dogs/" + foundDog._id);
                }
            });
        }
    });
});

app.get("/dogs/:id", function (req, res) {
    var id = req.params.id;
    Dog.findById(id).populate("comments").exec(function (err, element) {
        if (err) {
            console.log(err);
        } else {
            console.log(element);
            res.render("dogs/show", { dog: element });
        }
    });
});

app.get("/dogs", function (req, res) {
    Dog.find({}, function (err, allDogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("dogs/index", { dogs: allDogs });
        }
    });
});

app.get("/", function (req, res) {
    res.render("landing");
})

app.post("/dogs", function (req, res) {
    var name = req.body.name;
    var img = req.body.image;
    var description = req.body.description;
    var newDog = { name: name, image: img, description: description };
    Dog.create(newDog, function (err, newlyCreatedDog) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/dogs");
        }
    });
});

// AUTH ROUTES

//Show sign up form
app.get("/register", function (req, res) {
    res.render("register");
});

//handling sign up logic
app.post("/register", function (req, res) {
    req.body.username
    req.body.password
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('register'); //stops callback
        }
        passport.authenticate("local")(req, res, function () { //local would be "facebook" if we wanted fb auth
            res.redirect("/dogs");
        });
    });
});

//LOGIN ROUTES
app.get("/login", function (req, res) {
    res.render("login");
})

//login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/dogs",
    failureRedirect: "/login"
}), function (req, res) { }
);

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function () {
    console.log("DogCamp is running!");
});