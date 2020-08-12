let number, numberOfTries;

function randomNumber() {
    number = Math.floor(Math.random()*101);
    numberOfTries = 0;
    console.log(number);
}

function checkNumber() {
    let numberFromUser = document.getElementById("user-number").value;
    let message;

    numberOfTries++;
    if(numberFromUser.length === 0 || numberFromUser < 0 || 100 < numberFromUser ) {
        numberOfTries++;
        message = "Naucz się czytać! Kara +2 <br> Ilość prób: " + numberOfTries;
    }
    else if(number < numberFromUser) {
        message = "Za duża liczba! <br> Ilość prób: " + numberOfTries;
    }
    else if(numberFromUser < number) {
        message = "Za mała liczba! <br> Ilość prób: " + numberOfTries;
    }
    else {
        message = "O tak! To właśnie to! <br> Ilość prób: " + numberOfTries;
        document.getElementById('number-button').style.display = "none";
        document.getElementById('play-again').style.display = "initial";
        document.getElementById('user-number').classList.add('input-won');
    }
    document.getElementById("statement").innerHTML = message;
    console.log(numberOfTries);
}

function playAgain() {
    document.getElementById('user-number').classList.remove('input-won');
    document.getElementById('user-number').value="reset";
    document.getElementById('number-button').style.display = "initial";
    document.getElementById('play-again').style.display = "none";
    document.getElementById("statement").innerHTML = "Tylko lepiej tym razem!";
    randomNumber();
}