window.addEventListener('load', prepareBoard);
document.getElementById('play-again').addEventListener('click', prepareBoard);

function prepareBoard() {
    isPlayerOneTurn = true;
    arrayOfMoves.forEach((move, i) => {
        let divID = getIDFromNumber(i);
        let div = document.getElementById(divID);

        div.addEventListener('click', function() {
            makeMove(div.id);
        }, false);

        arrayOfMoves[i] = 0;
        let id = getIDFromNumber(i);
        document.getElementById(id).innerHTML = '';
    });
    let result = document.getElementById('result');
    result.innerText = 'Player';
    result.style.visibility = 'hidden';
    document.getElementById('draw').style.visibility = 'hidden';
    document.getElementById('final-board').style.display = 'none';
}

let isPlayerOneTurn;

let arrayOfMoves =
   [ 0, 0, 0,
     0, 0, 0,
     0, 0, 0 ];

const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8], //rows
    [0,3,6], [1,4,7], [2,5,8], //columns
    [0,4,8], [2,4,6] //diagonal
]

function makeMove(id) {
    let number = getNumberFromID(id);
    let div = document.getElementById(id);
    let height = div.offsetHeight;

    if(isPlayerOneTurn) {
        div.innerText = 'X';
        arrayOfMoves[number] = 1;
    } else {
        div.innerText = 'O';
        arrayOfMoves[number] = 2;
    }

    adjustHeight(number, height);
    div.replaceWith(div.cloneNode(true));
    checkWinner(isPlayerOneTurn);
    isPlayerOneTurn = !isPlayerOneTurn;
}

function adjustHeight(number, height) {
    for(let i = 0; i < 9; i++) {
        document.getElementById(getIDFromNumber(i)).style.height=height+'px';
    }
}

function checkWinner(isPlayerOneTurn) {
    let result = document.getElementById('result');

    if(isPlayerOneTurn) {
        winningCombinations.forEach(combination => {
            if( arrayOfMoves[combination[0]] === 1
                && arrayOfMoves[combination[1]] === 1
                && arrayOfMoves[combination[2]] === 1){

                document.getElementById('final-board').style.display = 'initial';
                let xWon = document.createTextNode(" X won!");
                result.appendChild(xWon);
                result.style.visibility = 'visible';
                inactiveBoard();
                return true;
            }
        });
    }
    else {
        winningCombinations.forEach(combination => {
            if( arrayOfMoves[combination[0]] === 2
                && arrayOfMoves[combination[1]] === 2
                && arrayOfMoves[combination[2]] === 2){

                document.getElementById('final-board').style.display = 'initial';
                let oWon = document.createTextNode(" O won!");
                result.appendChild(oWon);
                result.style.visibility = 'visible';
                inactiveBoard();
                return true;
            }
        });
    }
    checkDraw();
}

function checkDraw() {
    if(!arrayOfMoves.includes(0)) {
        document.getElementById('final-board').style.display = 'initial';
        document.getElementById('draw').style.visibility = 'visible';
        inactiveBoard();
    }
}

function inactiveBoard() {
    arrayOfMoves.forEach((move, i) => {
        let id = getIDFromNumber(i);
        let div = document.getElementById(id);
        div.replaceWith(div.cloneNode(true));
    });
}

function getNumberFromID(id) {
    switch (id) {
        case "zero": return 0;
        case "one": return 1;
        case "two": return 2;
        case "three": return 3;
        case "four": return 4;
        case "five": return 5;
        case "six": return 6;
        case "seven": return 7;
        case "eight": return 8;
    }
}

function getIDFromNumber(number) {
    switch (number) {
        case 0: return "zero";
        case 1: return "one";
        case 2: return "two";
        case 3: return "three";
        case 4: return "four";
        case 5: return "five";
        case 6: return "six";
        case 7: return "seven";
        case 8: return "eight";
    }
}