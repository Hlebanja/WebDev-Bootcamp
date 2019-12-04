var mongoose = require("mongoose");
var Dog = require("./models/dog");
var Comment = require("./models/comment");

var data = [
    {
        name: "Buddy",
        image: "https://images.unsplash.com/photo-1562220058-1a0a019ab606?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        description: "He is a basketball fan"
    },
    {
        name: "Bruce",
        image: "https://images.unsplash.com/photo-1555991415-1b04a71f18c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Gladiator"
    },
    {
        name: "Rusty",
        image: "https://images.unsplash.com/photo-1553882809-a4f57e59501d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "The dark knight"
    },
    {
        name: "Ghost",
        image: "https://images.unsplash.com/photo-1553531384-411a247ccd73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Basically a calf"
    },
    {
        name: "Happy",
        image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description: "Name and image speak for themselves!"
    }
]

function seedDB() {
    //Remove all dogs
    Dog.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed dogs!");
        }

        //Adding dogs
        data.forEach(function (seed) {
            Dog.create(seed, function (err, dog) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added doggo!");
                    //Create comment here
                    Comment.create(
                        {
                            text: "This is the best doggo!",
                            author: "Thiago"
                        }, function (err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                dog.comments.push(comment)
                                dog.save();
                                console.log("Created new comment");
                            }
                        });
                }
            })
        });
    });
}

module.exports = seedDB;