var TicTacToe = function () {

    var EMPTY = null;

    var board = [
    	[null,null,null],
    	[null,null,null],
    	[null,null,null],
    ];

    var play = function (player, cell){
        shape = getPlayerShape(player);
        changeCell(cell ,shape)
    }

    var getPlayerShape = function(player){
        if(player == 1)
            return 'x'
        else
            return 'o'
    }

    var changeCell = function(cell, shape){
        var row = cell[0]-1;
        var col = cell[1]-1;
        board[row, col] = 1;
    }

    return {
        play: play,
        board : board
    }
};
