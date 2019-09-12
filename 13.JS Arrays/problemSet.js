var arr = [-5, -1, 0];

//print reversed array
printReverse(arr);

function printReverse(arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
        console.log(arr[i]);
    }
}

//check if array is uniform
isUniform(arr);

function isUniform(arr) {
    var uniformity = true;
    var firstElement = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] !== firstElement) {
            uniformity = false;
        }
    }
    console.log(uniformity);
}

//sum elements in an array
sumArray(arr);

function sumArray(arr) {
    var sum = 0;
    arr.forEach(function (element) {
        sum += element;
    })
    console.log("sum is: " + sum);
}

//find max
findMax(arr);

function findMax(arr) {
    var max = arr[0];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    console.log("max number is: " + max);
}


console.log("new problem");
function binaryArrayToNumber (arr) {
    var sum = 0;
    var j = arr.length - 1;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i] * Math.pow(2, j);
        j--;
    }
    return sum;
};

console.log(binaryArrayToNumber([4,0,0]));
console.log(binaryArrayToNumber([1,1,1]));