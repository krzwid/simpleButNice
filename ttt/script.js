let arrayOfMoves =
    [ 0, 0, 0,
      0, 0, 0,
      0, 0, 0 ];

const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8], //rows
    [0,3,6], [1,4,7], [2,5,8], //columns
    [0,4,8], [2,4,6] //diagonal
];

let whichPlayerTurn;
let playerOwins = 0;
let playerXwins = 0;

window.addEventListener('load', prepareBoard);
document.getElementById('play-again').addEventListener('click', prepareBoard);

function prepareBoard() {
    document.getElementById('final-board').classList.add('displayNone');
    document.getElementById('result').classList.add('hide');
    document.getElementById('draw').classList.add('hide');
    document.getElementById('player-o-wins').classList.add('hide');
    document.getElementById('player-x-wins').classList.add('hide');

    whichPlayerTurn = Math.floor(Math.random() * 2) === 1 ? 'X' : 'O';
    whichPlayerTurn === 'X' ? alert('Player X starts') : alert('Player O starts');

    arrayOfMoves.forEach((move, i) => {
        const div = getPlayField(i);
        div.dataset.disabled = "false";

        div.addEventListener('click', function() {
            if (div.dataset.disabled !== "true") {
                makeMove(i);
            }
        }, false);

        arrayOfMoves[i] = 0;
        div.innerHTML = '';
    });
}

function makeMove(id) {
    const div = getPlayField(id);
    div.innerText = whichPlayerTurn;
    div.dataset.disabled = "true";

    arrayOfMoves[id] = whichPlayerTurn;
    checkWinner(whichPlayerTurn);
    whichPlayerTurn = whichPlayerTurn === 'X' ? 'O' : 'X';
}

function checkWinner(whichPlayerTurn) {
    winningCombinations.forEach(combination => {
        if( arrayOfMoves[combination[0]] === whichPlayerTurn
            && arrayOfMoves[combination[1]] === whichPlayerTurn
            && arrayOfMoves[combination[2]] === whichPlayerTurn){
            whichPlayerTurn === 'X' ? playerXwins++ : playerOwins++;
            displayFinalBoard(false);
            return true;
        }
    });
    checkDraw();
}

function checkDraw() {
    if(!arrayOfMoves.includes(0)) {
        displayFinalBoard(true);
    }
}

function displayFinalBoard(isDraw) {
    document.getElementById('final-board').classList.remove('displayNone');
    document.getElementById('player-x-wins').innerText = 'Player X score: ' + playerXwins;
    document.getElementById('player-o-wins').innerText = 'Player O score: ' + playerOwins;
    document.getElementById('player-x-wins').classList.remove('hide');
    document.getElementById('player-o-wins').classList.remove('hide');

    if (isDraw) {
        document.getElementById('draw').classList.remove('hide');
    }else {
        document.getElementById('result').innerText = 'Player ' + whichPlayerTurn + " won!";
        document.getElementById('result').classList.remove('hide');
    }
    inactiveBoard();
}

function inactiveBoard() {
    arrayOfMoves.forEach((move, i) => {
        getPlayField(i).dataset.disabled = "true";
    });
}

function getPlayField(divID) {
    return document.querySelector(`.play-field[data-index="${divID}"]`);
}