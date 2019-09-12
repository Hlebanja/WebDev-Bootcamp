var guess = prompt("Guess a number");

if (guess == 7) {
	alert("Bullseye!!")
} else {

	while(guess != 7) {
		guess = prompt("Guess a new number idiot");
	
		if (guess > 7) {
			alert("Too high"); 
		}
		if (guess < 7) {
			alert("Too low");
		}
		if (guess == 7) {
			alert("Finally got it right");
		}
	}
}
