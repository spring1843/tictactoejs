var Player = function (game, playerId) {

    var playerId = playerId;
    var game = game;
    var isAutoPlayInProgress = false;

    var play = function (row, column) {
        var shape = getShape();
        game.changeCell(row, column, shape);
    };

    var autoPlay = function () {

        isAutoPlayInProgress = true;

        var autoPlayFirstMove = function (playerId) {

            if (isAutoPlayInProgress == false)
                return;

            if (game.getGameStatus().moves > 0)
                return;

            var firstMoves = [
                [1, 1],
                [1, 3],
                [2, 2],
                [3, 1],
                [3, 3]
            ];

            var randomFirstMove = firstMoves[Math.floor(Math.random() * firstMoves.length)];
            play(randomFirstMove[0], randomFirstMove[1]);
            isAutoPlayInProgress = false;

        }();

        var autoPlayToWinWithOneMove = function () {

            if (isAutoPlayInProgress == false)
                return;

            var winningMoves = getWinningMoves();
            if (winningMoves.length > 0) {
                play(winningMoves[0][0], winningMoves[0][1]);
                isAutoPlayInProgress = false;
            }

        }();

        var autoPlayToBlockWinningOpponent = function () {

            if (isAutoPlayInProgress == false)
                return;

            var imaginaryOpponent = new Player(game, getOpponentId());
            var opponentWinningMoves = imaginaryOpponent.getWinningMoves();
            if (opponentWinningMoves.length > 0) {
                play(opponentWinningMoves[0][0], opponentWinningMoves[0][1]);
                isAutoPlayInProgress = false;
            }
        }();

        var autoPlayToFork = function () {

            if (isAutoPlayInProgress == false)
                return;

            var forkingMoves = getForkingMoves();
            if (forkingMoves.length > 0) {
                play(forkingMoves[0][0], forkingMoves[0][1]);
                isAutoPlayInProgress = false;
            }
        }();

        var autoPlayToBlockFork = function () {

            if (isAutoPlayInProgress == false)
                return;

            var imaginaryOpponent = new Player(game, getOpponentId());
            var opponentPlayerForkingMoves = imaginaryOpponent.getForkingMoves();
            if (opponentPlayerForkingMoves.length > 0) {
                play(opponentPlayerForkingMoves[0][0], opponentPlayerForkingMoves[0][1]);
                isAutoPlayInProgress = false;
            }
        }();

        var autoPlayCenter = function () {
            if (isAutoPlayInProgress == false)
                return;
            if (game.isCellOccupied(2, 2) == false) {
                play(2, 2);
                isAutoPlayInProgress = false;
            }

        }();

        var autoPlayFillTheLastPossibleCell = function () {
            if (isAutoPlayInProgress == false)
                return;

            var allPossibleMoves = getAllPossibleMoves();
            if (allPossibleMoves.length === 1) {
                play(allPossibleMoves[0][0], allPossibleMoves[0][1]);
                isAutoPlayInProgress = false;
            }
        }();
    };

    var getShape = function () {
        if (playerId === 1) {
            return 'x';
        } else {
            return 'o';
        }
    };

    var getPlayerFromShape = function (shape) {
        if (shape === 'x') {
            return 1;
        } else {
            return 2;
        }
    };

    var getOpponentId = function () {
        if (playerId === 1) {
            return 2;
        } else {
            return 1;
        }
    };

    var tryMoveForWin = function (row, column) {
        var imaginaryGame = getTempGameWithSameBoard();
        var imaginaRyPlayer = new Player(imaginaryGame, playerId);
        var currentBoard = getBoardClone();
        imaginaRyPlayer.play(row, column);
        var gameStatus = imaginaryGame.getGameStatus();
        game.setBoard(currentBoard);
        if (gameStatus.isGameOver === true && gameStatus.gameResult === 'win' && gameStatus.winnerShape === getShape())
            return true;
        return false;
    };

    var tryMoveForMultipleWinOpportunity = function (row, column) {
        var imaginaryGame = getTempGameWithSameBoard();
        var imaginaRyPlayer = new Player(imaginaryGame, playerId);
        var currentBoard = getBoardClone();
        imaginaRyPlayer.play(row, column);
        var winningMovesAfterMove = imaginaRyPlayer.getWinningMoves();
        game.setBoard(currentBoard);
        if (winningMovesAfterMove.length > 1)
            return true;
        return false;
    };


    var getWinningMoves = function () {
        var winningMoves = [];
        var allPossibleMoves = getAllPossibleMoves();
        for (i in allPossibleMoves) {
            var possibleMove = allPossibleMoves[i];
            if (tryMoveForWin(possibleMove[0], possibleMove[1]) === true) {
                winningMoves.push(possibleMove);
            }
        }
        return winningMoves;
    };

    var getForkingMoves = function () {
        var forkMoves = [];
        var allPossibleMoves = getAllPossibleMoves();
        for (i in allPossibleMoves) {
            var possibleMove = allPossibleMoves[i];
            if (tryMoveForMultipleWinOpportunity(possibleMove[0], possibleMove[1]) === true) {
                forkMoves.push(possibleMove);
            }
        }
        return forkMoves;
    };

    function getTempGameWithSameBoard() {
        var imaginaryGame = new TicTacToe();
        imaginaryGame.setBoard(game.getBoard());
        return imaginaryGame;
    }

    var getAllPossibleMoves = function () {
        var board = game.getBoard();
        var allPossibleMoves = [];
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
                if (board[row][col] === null) {
                    allPossibleMoves.push([row + 1, col + 1]);
                }
            }
        }
        return allPossibleMoves;
    };

    var getBoardClone = function () {
        board = game.getBoard();
        return [
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]]
        ];
    };

    return {
        play: play,
        autoPlay: autoPlay,
        getWinningMoves: getWinningMoves,
        getForkingMoves: getForkingMoves,
        getPlayerFromShape: getPlayerFromShape,
        getShape: getShape,
        getOpponent: getOpponentId
    }
};
