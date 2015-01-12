var TicTacToe = function () {

    var emptyBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    var board = emptyBoard;
    var isGameOver = false;
    var gameResult = null;
    var winnerShape = null;
    var moves = 0;
    var winnerLineType = null;
    var winnerLineNumber = null;

    var changeCell = function (row, column, shape) {

        if (isGameOver === true) {
            throw new exceptions.PlayingNotPossibleGameIsOver();
        }
        if (board[row - 1][column - 1] !== null)
            throw new exceptions.PlayingNotPossibleCellOccupied();
        board[row - 1][column - 1] = shape;
        moves++;
        checkAfterChange();
    };


    var checkAfterChange = function () {
        discoverAWin();
        discoverADraw();
    };


    var discoverAWin = function () {

        var discoverHorizontalWin = function () {
            if (isGameOver === true)
                return;

            for (var row = 0; row < 3; row++) {
                if (board[row][0] != null && board[row][0] == board[row][1] && board[row][0] == board[row][2]) {
                    finalizeDiscovery('win', 'horizontal', row + 1, board[row][0]);
                }
            }
        }();

        var discoverVerticalWin = function () {
            if (isGameOver === true)
                return;

            for (var col = 0; col < 3; col++) {
                if (board[0][col] != null && board[0][col] == board[1][col] && board[0][col] == board[2][col]) {
                    finalizeDiscovery('win', 'vertical', col + 1, board[0][col]);
                }
            }
        }();

        var discoverDiagonalWin = function () {
            if (isGameOver === true)
                return;

            if (board[0][0] != null && board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
                finalizeDiscovery('win', 'diagonal', 1, board[1][1]);
            }

            if (board[0][2] != null && board[0][2] == board[1][1] && board[0][2] == board[2][0]) {
                finalizeDiscovery('win', 'diagonal', 2, board[1][1]);
            }
        }();
    };

    var discoverADraw = function () {
        if (moves == 9 && isGameOver == false && winnerShape == null)
            finalizeDiscovery('draw', null, null, null);
    };

    var finalizeDiscovery = function (discovery, lineType, lineNumber, playerShape) {
        gameResult = discovery;
        winnerLineType = lineType;
        winnerLineNumber = lineNumber;
        winnerShape = playerShape;
        isGameOver = true;
    };

    var isCellOccupied = function (row, col) {
        if (board[row - 1][col - 1] === null)
            return false;
        else
            return true;
    };

    var getGameStatus = function () {
        return {
            isGameOver: isGameOver,
            moves: moves,
            gameResult: gameResult,
            winnerShape: winnerShape,
            winnerLineType: winnerLineType,
            winnerLineNumber: winnerLineNumber
        };
    };

    var getBoard = function () {
        return board;
    };


    var setBoard = function (newBoard) {
        board = newBoard;
        checkAfterChange();
    };

    var exceptions = {
        PlayingNotPossibleGameIsOver: function () {
            throw new Error("Playing is not possible, game is over");
        },
        PlayingNotPossibleCellOccupied: function () {
            throw new Error("Playing is not possible, this cell is occupied");
        }
    };

    return {
        getBoard: getBoard,
        setBoard: setBoard,
        changeCell: changeCell,
        getGameStatus: getGameStatus,
        isCellOccupied: isCellOccupied,
        exceptions: exceptions
    }
};