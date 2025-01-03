let turn = "X";
let turnCount = 0;
let board = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
let row = 0;
let col = 0;
const cells = document.querySelectorAll(".cell");
const gameStatus = document.getElementById("gameStatus");

cells.forEach(function(cell){
    cell.addEventListener("click", function (e){
        const curId = e.currentTarget.id;
        row = Math.floor(curId / 3);
        col = curId % 3;
        console.log(row);
        console.log(col);
        console.log(curId);
        if(board[row][col] == 0 && won() == "" && turnCount < 9){
            e.currentTarget.textContent = turn;
            whoseTurn(turn);

            if(won() == "X") whoWon("X");
            else if(won() == "O") whoWon("O");
            else if(won() == "Draw") whoWon("Draw");
        }else{
            if(won() != "") alert("The game has already ended. Please restart the game!");
            else alert("You can't place it here!")
        }
    })
});

function won(){
    if(turnCount >= 9) return "Draw";
    for(let i=0; i<3; i++){
        summe = 0;
        for(let j=0; j<3; j++){
            summe += board[i][j];
        }
        if(summe == 3) return "X";
        else if(summe == 12) return "O";
    }

    for(let i=0; i<3; i++){
        summe = 0;
        for(let j=0; j<3; j++){
            summe += board[j][i];
        }
        if(summe == 3) return "X";
        else if(summe == 12) return "O";
    }

    summe = board[0][0] + board[1][1] + board[2][2];
    if(summe == 3) return "X";
    else if(summe == 12) return "O";

    summe = board[0][2] + board[1][1] + board[2][0];
    if(summe == 3) return "X";
    else if(summe == 12) return "O";

    return "";
}

function whoseTurn(Turn){
    if(Turn == "X") {
        turn = "O";
        board[row][col] = 1;
    }
    else{
        turn = "X";
        board[row][col] = 4;
    } 
    turnCount++;
    gameStatus.textContent = turn +"'s turn!";

}

function whoWon(who){
    if(who == "Draw") gameStatus.textContent = "It's a draw!";
    else gameStatus.textContent = who + " won!";
    
}

function restart(){
    board = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
    turn = "X";
    turnCount = 0;
    clear();
    gameStatus.textContent = turn +"'s turn!";
}

function clear(){
    cells.forEach(function(cell){
        cell.textContent = "";
    })
}