var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = 
[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [6,4,2],
    [0,4,8]
]
const cells = document.querySelectorAll('.cell');
startGame();

function startGame()
{
    document.querySelector(".endgame").style.display="none";
    origBoard = Array.from(Array(9).keys());
    for(var i=0;i<cells.length;i++)
    {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',nextTurn,false);
    }
}

function nextTurn(square)
{
    turn(square.target.id,huPlayer);
}

function turn(squareID,player)
{
    origBoard[squareID] = player;
    document.getElementById(squareID).innerText=player;
    let gameWon=checkWin(origBoard,player);
    if(gameWon) gameOver(gameWon);
}

function checkWin(board,player)
{
    //Creating array plays containing all moves of 'player'
    let plays = board.reduce((a,e,i) =>
    (e===player) ? a.concat(i) : a,[]);

    let gameWon=null;
    
    //Iterating all win combinations and checking for each combination if all elements of each comnination are present in array 'Plays' or not
    for(let [index,element] of winCombos.entries())
    {
        if(element.every(elem => plays.indexOf(elem)>-1))
        {
            //returning that index of winCombo matching the current winning stituation and player
            gameWon={index:index , player:player};
            break;
        }
    }
    
    return gameWon;
}

function gameOver(gameWon)
{
    for(let index of winCombos[gameWon.index])
    {
        document.getElementById(index).style.backgroundColor = 
        gameWon.player == huPlayer?"green":"red";
    }
    for(var i=0;i<cells.length;i++)
    {
        cells[i].removeEventListener('click',nextTurn,false);
    }
}
