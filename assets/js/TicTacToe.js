var TicTacToe = function () {

    var emptyBoard = [
    	[null,null,null],
    	[null,null,null],
    	[null,null,null],
    ];

    var board = emptyBoard;
    var isGameOver = false;
    var winner = null;
    var moves = 0;
    var winnerLineType = null;
    var winnerLineNumber = null;

    var play = function (player, cell){
        if(isGameOver === true){
            throw new exceptions.PlayingNotPossible();
        }
        shape = getPlayerShape(player);
        changeCell(cell ,shape);
        discoverAWin();
    }

    var getPlayerShape = function(player){
        if(player == 1){
            return 'x';
        }else{
            return 'o';
        }
    }

    var getPlayerFromShape = function(player){
        if(player == 'x'){
            return 1;
        }else{
            return 2;
        }
    }

    var changeCell = function(cell, shape){
        var row = cell[0]-1;
        var col = cell[1]-1;
        board[row][col] = shape;
        moves++;
    }

    var discoverAWin = function(){
       discoverHorizontalWin();
    }

    var discoverHorizontalWin = function(){
        for(var row = 0; row < 3; row++){
            if(board[row][0] != null && board[row][0] == board[row][1] && board[row][0]  == board[row][2]){
                finilizeWin('horizontal', row + 1, getPlayerFromShape(board[0][0]));
            }
        }
    }

    var finilizeWin = function(lineType, lineNumber, player){
        winnerLineType = lineType;
        winnerLineNumber = lineNumber;
        winner = player;
        isGameOver = true;
    }

    var getIsGameOver = function(){
        return isGameOver;
    }

    var getWinner = function(){
        return winner;
    }

    var exceptions = {
        PlayingNotPossible : function(){
            throw new Error("Playing is not possible, game is over");
        }
    }

    return {
        play: play,
        board : board,
        getIsGameOver : getIsGameOver,
        getWinner : getWinner,
        exceptions : exceptions
    }
};
