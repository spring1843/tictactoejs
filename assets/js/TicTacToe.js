var TicTacToe = function () {

    var emptyBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    var board = emptyBoard;
    var isGameOver = false;
    var gameResult = null;
    var winner = null;
    var moves = 0;
    var winnerLineType = null;
    var winnerLineNumber = null;

    var play = function (player, cell) {
        if (isGameOver === true) {
            throw new exceptions.PlayingNotPossible();
        }
        shape = getPlayerShape(player);
        changeCell(cell, shape);
        discoverAWin();
    }

    var getPlayerShape = function (player) {
        if (player == 1) {
            return 'x';
        } else {
            return 'o';
        }
    }

    var getPlayerFromShape = function (player) {
        if (player == 'x') {
            return 1;
        } else {
            return 2;
        }
    }

    var changeCell = function (cell, shape) {
        var row = cell[0] - 1;
        var col = cell[1] - 1;
        board[row][col] = shape;
        moves++;
    }

    var discoverAWin = function () {
        discoverHorizontalWin();
        discoverVerticalWin();
        discoverDiagonalWin();
    }

    var discoverHorizontalWin = function () {
        if (isGameOver === true)
            return

        for (var row = 0; row < 3; row++) {
            if (board[row][0] != null && board[row][0] == board[row][1] && board[row][0] == board[row][2]) {
                finilizeDiscovery('win','horizontal', row + 1, getPlayerFromShape(board[row][0]));
            }
        }
    }

    var discoverVerticalWin = function () {
        if (isGameOver === true)
            return

        for (var col = 0; col < 3; col++) {
            if (board[0][col] != null && board[0][col] == board[1][col] && board[0][col] == board[2][col]) {
                finilizeDiscovery('win','vertical', col + 1, getPlayerFromShape(board[0][col]));
            }
        }
    }

    var discoverDiagonalWin = function () {
        if (isGameOver === true)
            return

        if (board[0][0] != null && board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
            finilizeDiscovery('win','diagonal', 1, getPlayerFromShape(board[1][1]));
        }

        if (board[0][2] != null && board[0][2] == board[1][1] && board[0][2] == board[2][0]) {
            finilizeDiscovery('win','diagonal', 2, getPlayerFromShape(board[1][1]));
        }
    }

    var finilizeDiscovery = function (discovery, lineType, lineNumber, player) {
        gameResult = discovery;
        winnerLineType = lineType;
        winnerLineNumber = lineNumber;
        winner = player;
        isGameOver = true;
    }

    var getGameStatus = function () {
        return {
            isGameOver : isGameOver,
            gameResult : gameResult,
            winner : winner,
            winnerLineType : winnerLineType,
            winnerLineNumber : winnerLineNumber
        };
    }

    var exceptions = {
        PlayingNotPossible: function () {
            throw new Error("Playing is not possible, game is over");
        }
    }

    return {
        play: play,
        board: board,
        getGameStatus: getGameStatus,
        exceptions: exceptions
    }
};
