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

async function nextTurn(square)
{
    //To prevent repeat click on single check box
    //id of that check box is replaced by 'huPlayer' or 'aiPlayer'
    //So it is checked that it wasn't clicked before
    if(typeof origBoard[square.target.id]=='number')
    {
        let breakOrContinue=turn(square.target.id,huPlayer);
        if(breakOrContinue) setTimeout(() => { if(!checkTie()) turn(bestSpot(),aiPlayer); }, 200);
        console.log(origBoard);
    }
}

function turn(squareID,player)
{
    origBoard[squareID] = player;
    document.getElementById(squareID).innerText=player;
    let gameWon=checkWin(origBoard,player);
    if(gameWon) 
    {
        gameOver(gameWon);
        return false;
    }
    return true;
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
    for(var i=0;i<cells.length;i++)
        {
            cells[i].style.backgroundColor="silver";
            cells[i].removeEventListener('click',nextTurn,false);
        }
    for(let index of winCombos[gameWon.index])
    {
        document.getElementById(index).style.backgroundColor = 
        gameWon.player == huPlayer?"limegreen":"coral";
    }
    declareWinner(gameWon.player == huPlayer? "You Win!!" : "You Lose!!");
}

function bestSpot()
{
    //list of remaining spots
    let emptySquare= origBoard.filter(s => typeof s=='number');
    
    //returning a random empty spot let say 1st from list
    return emptySquare[0];
}

function checkTie()
{
    //list of remaining spots
    let emptySquare= origBoard.filter(s => typeof s=='number');
    if(emptySquare.length==0)
    {
        for(var i=0;i<cells.length;i++)
        {
            cells[i].style.backgroundColor=
            origBoard[i]=='X'?"olive":"teal";
            cells[i].removeEventListener('click',nextTurn,false);
        }
        declareWinner("It's a Tie");
        return true;
    }
    return false;
}

function declareWinner(winner)
{
    document.querySelector(".endgame").style.display="block";
    document.querySelector(".endgame .text").innerText = winner;
}