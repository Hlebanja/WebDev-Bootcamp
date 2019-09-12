var isGameOver = false;

var buttonOne = document.querySelector("#buttonOne");
var buttonTwo = document.querySelector("#buttonTwo");
var buttonReset = document.querySelector("#resetButton");

var playerOneScore = document.querySelector("#scoreOne");
var playerTwoScore = document.querySelector("#scoreTwo");

var scoreOneTracker = 0;
var scoreTwoTracker = 0;

var displayedScoreLimit = document.querySelector("#displayedScoreLimit");
var inputForm = document.querySelector("input");;

inputForm.addEventListener("change", function () {
    displayedScoreLimit.textContent = Number(inputForm.value);
    if (Number(displayedScoreLimit.textContent) < 0) {
        alert("Enter a valid number!");
        displayedScoreLimit.textContent = 0; 
        inputForm.value = 0;
    }
    reset();
});

buttonOne.addEventListener("click", function () {
    if (Number(displayedScoreLimit.textContent) === 0) {
        alert("Please set the winning score first!");
    } else {
        if (!isGameOver) {
            scoreOneTracker++;
            document.querySelector("#scoreOne").textContent = scoreOneTracker;

            if (scoreOneTracker == displayedScoreLimit.textContent) {
                playerOneScore.classList.add("green");
                isGameOver = true;
            }
        }
    }
});

buttonTwo.addEventListener("click", function () {
    if (Number(displayedScoreLimit.textContent) === 0) {
        alert("Please set the winning score first!");
    } else {   
        if (!isGameOver) {
            scoreTwoTracker++;
            document.querySelector("#scoreTwo").textContent = scoreTwoTracker;
            
            if (scoreTwoTracker == displayedScoreLimit.textContent) {
                playerTwoScore.classList.add("green");
                isGameOver = true;
            }
        }
    }
});

buttonReset.addEventListener("click", function () {
    reset();
});

function reset() {
    isGameOver = false;
    scoreOneTracker = 0;
    scoreTwoTracker = 0;
    playerOneScore.textContent = 0;
    playerTwoScore.textContent = 0;
    playerOneScore.classList.remove("green");
    playerTwoScore.classList.remove("green");
}