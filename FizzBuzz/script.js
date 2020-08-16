window.addEventListener('load', prepareGame);
let time = 10.0;
let number;
let timer;

function startTimer(duration, display) {
    let minutes, seconds;
    timer = duration;
    let x = setInterval(function () {
        minutes = parseInt(timer / 60,10);
        seconds = parseInt(timer % 60,10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            lost();
            clearInterval(x);
        }
    }, 1000);
}

let answerNumber = document.getElementById('answer-number');
let answerFizz = document.getElementById('answer-fizz');
let answerBuzz = document.getElementById('answer-buzz');
let answerFizzBuzz = document.getElementById('answer-fizzbuzz');
let currentScore = document.getElementById('current-score');
let bestScoreDiv = document.getElementById('best-score');
let properNumber = document.getElementById('proper-number');

answerNumber.addEventListener("click", clickAnswer);
answerFizz.addEventListener("click", clickAnswer);
answerBuzz.addEventListener("click", clickAnswer);
answerFizzBuzz.addEventListener("click", clickAnswer);

function prepareGame() {
    number = 1;
    answerNumber.innerText = number.toString();
    properNumber.innerText = number.toString();
    currentScore.innerText = 'Your current score: ' + number.toString();
    time = 10;
    let display = document.getElementById('time');
    startTimer(time, display);
    bestScoreDiv.innerText = 'Best score: ' + localStorage.getItem('best-score');
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


function checkAnswer(elementID) {
    switch (elementID) {
        case answerNumber:
            if(!(number % 5 !== 0 && number % 7 !== 0)) {
                return lost();
            }
            break;
        case answerFizz:
            if(!(number % 5 === 0 && number % 7 !== 0)) {
                return lost();
            }
            break;
        case answerBuzz:
            if(!(number % 5 !== 0 && number % 7 === 0)) {
                return lost();
            }
            break;
        case answerFizzBuzz:
            if(!(number % 5 === 0 && number % 7 === 0)) {
                return lost();
            }
            break;

    }
    return true;
}


let benefit = 2.0
function addScore() {
    if(number % 5 === 0 ) {
        benefit -= 0.1;
    }
    timer+=benefit;
}

function lost() {
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

