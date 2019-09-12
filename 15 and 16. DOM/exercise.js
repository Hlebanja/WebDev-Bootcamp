// var tag = document.querySelector("body > p");
// console.log("querySelector body > p:")
// console.log(tag);

// var tag = document.querySelector("p");
// console.log("querySelector p:")
// console.log(tag);

// tag = document.getElementById("first")
// console.log("by ID:")
// console.log(tag);

// tag = document.getElementsByName("p");
// console.log("by name");
// console.log(tag);

// tag = document.getElementsByClassName(".special");
// console.log(tag);

// tag = document.querySelectorAll("p");
// console.log(tag);

var tag = document.querySelector("button");
console.log(tag);

tag.addEventListener("click", function() {
  document.body.classList.toggle("purple");
});
