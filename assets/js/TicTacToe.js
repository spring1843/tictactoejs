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
            throw new exceptions.PlayingNotPossibleGameIsOver();
        }
        var shape = getPlayerShape(player);
        changeCell(cell, shape);
        checkAfterChange();
    }

    var checkAfterChange = function () {
        discoverAWin();
        discoverADraw();
    }

    var autoPlay = function (player) {
        autoPlayToWinWithOneMove(player);
        autoPlayFillTheLastPossibleCell(player);
    }

    var autoPlayFillTheLastPossibleCell = function(player){
        var allPossibleMoves = getAllPossibleMoves();
        if(allPossibleMoves.length === 1){
            play(player, allPossibleMoves[0]);
        }
    }

    var autoPlayToWinWithOneMove = function (player) {
        var allPossibleMoves = getAllPossibleMoves();
        for (i in allPossibleMoves) {
            var possibleMove = allPossibleMoves[i];
            if (tryMoveForWin(player, possibleMove) === true) {
                play(player, possibleMove);
                break;
            }
        }
    }

    var tryMoveForWin = function(player, move){
        var tempGame = getTempGameWithSameBoard();
        //TODO board in this scope changes after calling the tempGame, the current board is stored in defense, find out why and fix
        var currentBoard = getBoardClone();
        tempGame.play(player, move);
        var tempGameStatus = tempGame.getGameStatus();
        board = currentBoard;
        if (tempGameStatus.isGameOver === true && tempGameStatus.gameResult === 'win' && tempGameStatus.winner === player)
            return true;
        return false;
    }

    var getAllPossibleMoves = function () {
        var allPossibleMoves = [];
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
                if (board[row][col] === null) {
                    allPossibleMoves.push([row + 1, col + 1]);
                }
            }
        }
        return allPossibleMoves;
    }

    function getTempGameWithSameBoard() {
        var tempGame = new TicTacToe();
        tempGame.setBoard(getBoard());
        return tempGame;
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
        if(board[row][col] !== null)
            throw new exceptions.PlayingNotPossibleCellOccupied();
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
                finalizeDiscovery('win', 'horizontal', row + 1, getPlayerFromShape(board[row][0]));
            }
        }
    }

    var discoverVerticalWin = function () {
        if (isGameOver === true)
            return

        for (var col = 0; col < 3; col++) {
            if (board[0][col] != null && board[0][col] == board[1][col] && board[0][col] == board[2][col]) {
                finalizeDiscovery('win', 'vertical', col + 1, getPlayerFromShape(board[0][col]));
            }
        }
    }

    var discoverDiagonalWin = function () {
        if (isGameOver === true)
            return

        if (board[0][0] != null && board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
            finalizeDiscovery('win', 'diagonal', 1, getPlayerFromShape(board[1][1]));
        }

        if (board[0][2] != null && board[0][2] == board[1][1] && board[0][2] == board[2][0]) {
            finalizeDiscovery('win', 'diagonal', 2, getPlayerFromShape(board[1][1]));
        }
    }

    var discoverADraw = function () {
        if (moves == 9 && isGameOver == false && winner == null)
            finalizeDiscovery('draw', null, null, null);
    }

    var finalizeDiscovery = function (discovery, lineType, lineNumber, player) {
        gameResult = discovery;
        winnerLineType = lineType;
        winnerLineNumber = lineNumber;
        winner = player;
        isGameOver = true;
    }

    var getGameStatus = function () {
        return {
            isGameOver: isGameOver,
            gameResult: gameResult,
            winner: winner,
            winnerLineType: winnerLineType,
            winnerLineNumber: winnerLineNumber
        };
    }

    var getBoard = function () {
        return board;
    }

    var getBoardClone = function () {
        return [
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]]
        ];
    }

    var setBoard = function (newBoard) {
        board = newBoard;
        checkAfterChange();
    }

    var exceptions = {
        PlayingNotPossibleGameIsOver: function () {
            throw new Error("Playing is not possible, game is over");
        },
        PlayingNotPossibleCellOccupied: function () {
            throw new Error("Playing is not possible, this cell is occupied");
        }

    }

    return {
        play: play,
        autoPlay: autoPlay,
        getBoard: getBoard,
        setBoard: setBoard,
        getGameStatus: getGameStatus,
        exceptions: exceptions
    }
};
