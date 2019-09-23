var faker = require("faker");

console.log("====================")
console.log("Welcome to the shop")
console.log("====================")

var productName;
var productAdjective;
var productPrice;



for (var i = 0; i < 10; i++) {
    productName = faker.commerce.product() ;
    productAdjective = faker.commerce.productAdjective();
    productPrice = faker.commerce.price();

    console.log(productAdjective + " " + productName + " - $" + productPrice);
}