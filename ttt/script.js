let arrayOfMoves =
    [ 0, 0, 0,
      0, 0, 0,
      0, 0, 0 ];

const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8], //rows
    [0,3,6], [1,4,7], [2,5,8], //columns
    [0,4,8], [2,4,6] //diagonal
]

let whichPlayerTurn;

window.addEventListener('load', prepareBoard);
document.getElementById('play-again').addEventListener('click', prepareBoard);

function prepareBoard() {
    Math.floor(Math.random() * 2) === 1 ? whichPlayerTurn = 'X' : whichPlayerTurn = 'O';

    arrayOfMoves.forEach((move, i) => {
        let div = document.querySelector(`.play-field[data-index="${i}"]`);
        div.addEventListener('click', function() {
            makeMove(i);
        }, false);

        arrayOfMoves[i] = 0;
        div.innerHTML = '';
    });

    document.getElementById('result').innerText = 'Player';
    document.getElementById('result').style.visibility = 'hidden';
    document.getElementById('draw').style.visibility = 'hidden';
    document.getElementById('final-board').style.display = 'none';
}

function makeMove(id) {
    let div = document.querySelector(`.play-field[data-index="${id}"]`);
    div.innerText = whichPlayerTurn;
    arrayOfMoves[id] = whichPlayerTurn;
    div.replaceWith(div.cloneNode(true));
    checkWinner(whichPlayerTurn);
    whichPlayerTurn = whichPlayerTurn === 'X' ? whichPlayerTurn = 'O' : whichPlayerTurn = 'X';
}

function checkWinner(whichPlayerTurn) {
    console.log(arrayOfMoves);
    winningCombinations.forEach(combination => {
        if( arrayOfMoves[combination[0]] === whichPlayerTurn
            && arrayOfMoves[combination[1]] === whichPlayerTurn
            && arrayOfMoves[combination[2]] === whichPlayerTurn){

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
    document.getElementById('final-board').style.display = 'initial';

    if (isDraw) {
        document.getElementById('draw').style.visibility = 'visible';
    }else {
        let whoWon = document.createTextNode(" " + whichPlayerTurn + " won!");
        document.getElementById('result').appendChild(whoWon);
        document.getElementById('result').style.visibility = 'visible';
    }
    inactiveBoard();
}

function inactiveBoard() {
    arrayOfMoves.forEach((move, i) => {
        let div = document.querySelector(`.play-field[data-index="${i}"]`);
        div.replaceWith(div.cloneNode(true));
    });
}