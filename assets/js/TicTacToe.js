var TicTacToe = function () {

    var emptyBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    var board = emptyBoard;
    var isGameOver = false;
    var isAutoPlayInProgress = false;
    var gameResult = null;
    var winner = null;
    var moves = 0;
    var winnerLineType = null;
    var winnerLineNumber = null;

    var player = new Player();
    var play = function (playerId, move) {
        if (isGameOver === true) {
            throw new exceptions.PlayingNotPossibleGameIsOver();
        }
        var shape = player.getPlayerShape(playerId);
        var cell = [move[0] - 1, move[1] - 1];
        changeCell(cell, shape);
        checkAfterChange();
    }

    var checkAfterChange = function () {
        discoverAWin();
        discoverADraw();
    }

    var tryMoveForWin = function (playerId, move) {
        var tempGame = getTempGameWithSameBoard();
        //TODO board in this scope changes after calling the tempGame, the current board is stored in defense, find out why and fix
        var currentBoard = getBoardClone();
        tempGame.play(playerId, move);
        var gameStatus = tempGame.getGameStatus();
        board = currentBoard;
        if (gameStatus.isGameOver === true && gameStatus.gameResult === 'win' && gameStatus.winner === playerId)
            return true;
        return false;
    }

    var tryMoveForMultipleWinOpportunity = function (playerId, move) {
        var tempGame = getTempGameWithSameBoard();
        //TODO board in this scope changes after calling the tempGame, the current board is stored in defense, find out why and fix
        var currentBoard = getBoardClone();
        tempGame.play(playerId, move);
        var winningMovesAfterMove = tempGame.getWinningMoves(playerId);
        board = currentBoard;
        if (winningMovesAfterMove.length > 1)
            return true;
        return false;
    };

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

    var getWinningMoves = function (playerId) {
        var winningMoves = [];
        var allPossibleMoves = getAllPossibleMoves();
        for (i in allPossibleMoves) {
            var possibleMove = allPossibleMoves[i];
            if (tryMoveForWin(playerId, possibleMove) === true) {
                winningMoves.push(possibleMove);
            }
        }
        return winningMoves;
    }

    var getForkingMoves = function (playerId) {
        var forkMoves = [];
        var allPossibleMoves = getAllPossibleMoves();

        for (i in allPossibleMoves) {
            var possibleMove = allPossibleMoves[i];
            if (tryMoveForMultipleWinOpportunity(playerId, possibleMove) === true) {
                forkMoves.push(possibleMove);
            }
        }
        return forkMoves;
    }


    function getTempGameWithSameBoard() {
        var tempGame = new TicTacToe();
        tempGame.setBoard(board);
        return tempGame;
    }


    var changeCell = function (cell, shape) {
        var row = cell[0];
        var col = cell[1];
        if (board[row][col] !== null)
            throw new exceptions.PlayingNotPossibleCellOccupied();
        board[row][col] = shape;
        moves++;
    }

    var discoverAWin = function () {

        var discoverHorizontalWin = function () {
            if (isGameOver === true)
                return

            for (var row = 0; row < 3; row++) {
                if (board[row][0] != null && board[row][0] == board[row][1] && board[row][0] == board[row][2]) {
                    finalizeDiscovery('win', 'horizontal', row + 1, player.getPlayerFromShape(board[row][0]));
                }
            }
        }();

        var discoverVerticalWin = function () {
            if (isGameOver === true)
                return

            for (var col = 0; col < 3; col++) {
                if (board[0][col] != null && board[0][col] == board[1][col] && board[0][col] == board[2][col]) {
                    finalizeDiscovery('win', 'vertical', col + 1, player.getPlayerFromShape(board[0][col]));
                }
            }
        }();

        var discoverDiagonalWin = function () {
            if (isGameOver === true)
                return

            if (board[0][0] != null && board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
                finalizeDiscovery('win', 'diagonal', 1, player.getPlayerFromShape(board[1][1]));
            }

            if (board[0][2] != null && board[0][2] == board[1][1] && board[0][2] == board[2][0]) {
                finalizeDiscovery('win', 'diagonal', 2, player.getPlayerFromShape(board[1][1]));
            }
        }();
    }

    var discoverADraw = function () {
        if (moves == 9 && isGameOver == false && winner == null)
            finalizeDiscovery('draw', null, null, null);
    }

    var autoPlay = function (playerId) {

        isAutoPlayInProgress = true;

        var autoPlayFirstMove = function (playerId) {

            if (isAutoPlayInProgress == false)
                return;

            if (moves > 0)
                return;

            var firstMoves = [
                [1, 1],
                [1, 3],
                [2, 2],
                [3, 1],
                [3, 3]
            ];

            var randomFirstMove = firstMoves[Math.floor(Math.random() * firstMoves.length)];
            play(playerId, randomFirstMove);
            isAutoPlayInProgress = false;

        }(playerId);

        var autoPlayToWinWithOneMove = function (playerId) {

            if (isAutoPlayInProgress == false)
                return;

            var winningMoves = getWinningMoves(playerId);
            if (winningMoves.length > 0) {
                play(playerId, winningMoves[0]);
                isAutoPlayInProgress = false;
            }

        }(playerId);

        var autoPlayToBlockWinningOpponent = function (playerId) {

            if (isAutoPlayInProgress == false)
                return;

            var opponentPlayer = player.getPlayerOponent(playerId);
            var opponentWinningMoves = getWinningMoves(opponentPlayer);
            if (opponentWinningMoves.length > 0) {
                play(playerId, opponentWinningMoves[0]);
                isAutoPlayInProgress = false;
            }
        }(playerId);

        var autoPlayToFork = function (playerId) {

            if (isAutoPlayInProgress == false)
                return;

            var forkingMoves = getForkingMoves(playerId);
            if (forkingMoves.length > 0) {
                play(playerId, forkingMoves[0]);
                isAutoPlayInProgress = false;
            }
        }(playerId);

        var autoPlayToBlockFork = function (playerId) {

            if (isAutoPlayInProgress == false)
                return;

            var opponentPlayer = player.getPlayerOponent(playerId);
            var opponentPlayerForkingMoves = getForkingMoves(opponentPlayer);
            if (opponentPlayerForkingMoves.length > 0) {
                play(playerId, opponentPlayerForkingMoves[0]);
                isAutoPlayInProgress = false;
            }
        }(playerId);

        var autoPlayCenter = function (playerId) {
            if (isAutoPlayInProgress == false)
                return;
                if(board[1][1] === null) {
                    play(playerId, [2, 2]);
                    isAutoPlayInProgress = false;
                }

        }(playerId);

        var autoPlayFillTheLastPossibleCell = function (playerId) {
            if (isAutoPlayInProgress == false)
                return;

            var allPossibleMoves = getAllPossibleMoves();
            if (allPossibleMoves.length === 1) {
                play(playerId, allPossibleMoves[0]);
                isAutoPlayInProgress = false;
            }
        }(playerId);
    }


    var finalizeDiscovery = function (discovery, lineType, lineNumber, playerId) {
        gameResult = discovery;
        winnerLineType = lineType;
        winnerLineNumber = lineNumber;
        winner = playerId;
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
        getWinningMoves: getWinningMoves,
        exceptions: exceptions
    }
};