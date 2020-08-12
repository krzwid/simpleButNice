let arrayOfMoves =
   [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
   ];

let playerOne = true;

function makeMove(id) {
    let number = getNumberFromID(id);
    let height = document.getElementById(id).offsetHeight;

    if(playerOne) {
        document.getElementById(id).innerHTML = 'X';
        arrayOfMoves[number] = 1;
        playerOne = false;
        document.getElementById(id).removeAttribute("onclick");
        if(checkPlayerWon()) return;
        checkDraw();
    }
    else {
        document.getElementById(id).innerText = 'O';
        arrayOfMoves[number] = 2;
        playerOne = true;
        document.getElementById(id).removeAttribute("onclick");
        if(checkComputerWon()) return;
        checkDraw();
    }
    adjustHeight(number, height);
}

function adjustHeight(number, height) {
    for(let i = 0; i < 9; i++) {
        document.getElementById(getIDFromNumber(i)).style.height=height+'px';
    }
}

function prepareBoard() {
    arrayOfMoves.forEach((move, i) => {
        arrayOfMoves[i] = 0;
        let id = getIDFromNumber(i);
        document.getElementById(id).innerHTML = '';
        document.getElementById(id).setAttribute('onclick', 'makeMove(this.id)');
    });
    document.getElementById('won').style.visibility = 'hidden';
    document.getElementById('lost').style.visibility = 'hidden';
    document.getElementById('draw').style.visibility = 'hidden';
    document.getElementById('final-board').style.display = 'none';
}

function inactiveBoard() {
    arrayOfMoves.forEach((move, i) => {
        let id = getIDFromNumber(i);
        let div = document.getElementById(id);
        if (div.hasAttribute('onclick')){
            div.removeAttribute('onclick');
        }
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

function checkDraw() {
    let isDraw = !arrayOfMoves.includes(0);
    if(isDraw) {
        document.getElementById('final-board').style.display = 'initial';
        document.getElementById('draw').style.visibility = 'visible';
        inactiveBoard();
        return true;
    }
    return false;
}

function checkPlayerWon() {
    let playerWon = false;
    if(arrayOfMoves[0] === 1 && arrayOfMoves[1] === 1 && arrayOfMoves[2] === 1) playerWon = true;
    if(arrayOfMoves[3] === 1 && arrayOfMoves[4] === 1 && arrayOfMoves[5] === 1) playerWon = true;
    if(arrayOfMoves[6] === 1 && arrayOfMoves[7] === 1 && arrayOfMoves[8] === 1) playerWon = true;

    if(arrayOfMoves[0] === 1 && arrayOfMoves[3] === 1 && arrayOfMoves[6] === 1) playerWon = true;
    if(arrayOfMoves[1] === 1 && arrayOfMoves[4] === 1 && arrayOfMoves[7] === 1) playerWon = true;
    if(arrayOfMoves[2] === 1 && arrayOfMoves[5] === 1 && arrayOfMoves[8] === 1) playerWon = true;

    if(arrayOfMoves[0] === 1 && arrayOfMoves[4] === 1 && arrayOfMoves[8] === 1) playerWon = true;
    if(arrayOfMoves[2] === 1 && arrayOfMoves[4] === 1 && arrayOfMoves[6] === 1) playerWon = true;

    if(playerWon) {
        document.getElementById('final-board').style.display = 'initial';
        document.getElementById('won').style.visibility = 'visible';

        inactiveBoard();
        return true;
    }
    return false;
}

function checkComputerWon() {
    let computerWon = false;
    if(arrayOfMoves[0] === 2 && arrayOfMoves[1] === 2 && arrayOfMoves[2] === 2) computerWon = true;
    if(arrayOfMoves[3] === 2 && arrayOfMoves[4] === 2 && arrayOfMoves[5] === 2) computerWon = true;
    if(arrayOfMoves[6] === 2 && arrayOfMoves[7] === 2 && arrayOfMoves[8] === 2) computerWon = true;

    if(arrayOfMoves[0] === 2 && arrayOfMoves[3] === 2 && arrayOfMoves[6] === 2) computerWon = true;
    if(arrayOfMoves[1] === 2 && arrayOfMoves[4] === 2 && arrayOfMoves[7] === 2) computerWon = true;
    if(arrayOfMoves[2] === 2 && arrayOfMoves[5] === 2 && arrayOfMoves[8] === 2) computerWon = true;

    if(arrayOfMoves[0] === 2 && arrayOfMoves[4] === 2 && arrayOfMoves[8] === 2) computerWon = true;
    if(arrayOfMoves[2] === 2 && arrayOfMoves[4] === 2 && arrayOfMoves[6] === 2) computerWon = true;

    if(computerWon){
        document.getElementById('final-board').style.display = 'initial';
        document.getElementById('lost').style.visibility = 'visible';

        inactiveBoard();
        return true;
    }
    return false;
}