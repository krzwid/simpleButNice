window.addEventListener('load', prepareGame);

const answerNumber = document.getElementById('answer-number');
const answerFizz = document.getElementById('answer-fizz');
const answerBuzz = document.getElementById('answer-buzz');
const answerFizzBuzz = document.getElementById('answer-fizzbuzz');
const currentScore = document.getElementById('current-score');
const bestScoreDiv = document.getElementById('best-score');
const properNumber = document.getElementById('proper-number');
const instruction = document.getElementById('instruction');

let number, timer, time = 10.0, firstDivisor, secondDivisor, timeBenefit, intervalID;

answerNumber.addEventListener('click', clickAnswer);
answerFizz.addEventListener('click', clickAnswer);
answerBuzz.addEventListener('click', clickAnswer);
answerFizzBuzz.addEventListener('click', clickAnswer);

function prepareGame() {
    firstDivisor = Math.floor(Math.random() * 10) + 2;
    do {
        secondDivisor = Math.floor(Math.random() * 10) + 2;
    } while (secondDivisor === firstDivisor);

    instruction.innerHTML = "Click proper button. If number is divided by <br> " +
        "- " + firstDivisor + " and " + secondDivisor + " click 'FizzBuzz'<br> " +
        "- only "  + secondDivisor + " click 'Buzz'<br> " +
        "- only " + firstDivisor + " click 'Fizz'<br> " +
        "Otherwise click number.";

    number = 1;
    timeBenefit = 2.0;
    answerNumber.innerText = number.toString();
    properNumber.innerText = number.toString();
    currentScore.innerText = 'Your current score: ' + number.toString();
    time = 10;
    let display = document.getElementById('time');
    startTimer(time, display);
    bestScoreDiv.innerText = 'Best score: ' + localStorage.getItem('best-score');
}

function startTimer(duration, display) {
    let minutes, seconds;
    timer = duration;
    intervalID = setInterval(function () {
        minutes = parseInt(timer / 60,10);
        seconds = parseInt(timer % 60,10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            lost();
            clearInterval(intervalID);
        }
    }, 1000);

}

function clickAnswer() {
    if(!checkAnswer(this)) {
        return;
    }
    addScore();
    number++;
    answerNumber.innerText = number.toString();
    properNumber.innerText = number.toString();
    currentScore.innerText = 'Your current score: ' + number.toString();
}

function addScore() {
    if(number % firstDivisor === 0 && time > 0.5) {
        timeBenefit -= 0.1;
    }
    timer += timeBenefit;
}

function checkAnswer(elementID) {
    switch (elementID) {
        case answerNumber:
            if(!(number % firstDivisor !== 0 && number % secondDivisor !== 0)) {
                return lost();
            }
            break;
        case answerFizz:
            if(!(number % firstDivisor === 0 && number % secondDivisor !== 0)) {
                return lost();
            }
            break;
        case answerBuzz:
            if(!(number % firstDivisor !== 0 && number % secondDivisor === 0)) {
                return lost();
            }
            break;
        case answerFizzBuzz:
            if(!(number % firstDivisor === 0 && number % secondDivisor === 0)) {
                return lost();
            }
            break;
    }
    return true;
}

function lost() {
    clearInterval(intervalID);
    alert("Game over!");
    checkBestScore();
    prepareGame();
    return false;
}

function checkBestScore() {
    let bestScore = localStorage.getItem("best-score");
    if(number > bestScore) {
        localStorage.setItem("best-score", number);
    }
}