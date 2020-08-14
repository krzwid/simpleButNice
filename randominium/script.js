window.addEventListener('load', randomNumber);

let numberButton = document.getElementById('number-button');
let playAgainButton = document.getElementById('play-again');
let userNumberInput = document.getElementById('user-number');

playAgainButton.addEventListener('click', playAgain);
numberButton.addEventListener('click', checkNumber);
userNumberInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        checkNumber();
    }
});

let number, numberOfTries;

function randomNumber() {
    number = Math.floor(Math.random()*101);
    numberOfTries = 0;
}

function checkNumber() {
    let numberFromUser = userNumberInput.value;
    let message;

    numberOfTries++;
    if(numberFromUser.length === 0 || numberFromUser < 0 || 100 < numberFromUser ) {
        numberOfTries++;
        message = "Learn how to read! Penalty: +2 <br> Number of tries: " + numberOfTries;
    }
    else if(number < numberFromUser) {
        message = "Too many! <br> Number of tries: " + numberOfTries;
    }
    else if(numberFromUser < number) {
        message = "Too few! <br>Number of tries: " + numberOfTries;
    }
    else {
        message = "Oh yeah! That's it! <br> Number of tries: " + numberOfTries;
        numberButton.style.display = "none";
        playAgainButton.style.display = "initial";
        userNumberInput.classList.add('input-won');
    }
    document.getElementById("statement").innerHTML = message;
}

function playAgain() {
    userNumberInput.classList.remove('input-won');
    userNumberInput.value="reset";
    numberButton.style.display = "initial";
    playAgainButton.style.display = "none";
    document.getElementById("statement").innerHTML = "This time better!";
    randomNumber();
}