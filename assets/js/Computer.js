var Computer = function (game, playerId, shape, opponentId) {

    game = game;
    playerId = playerId;
    shape = shape;
    opponentId = opponentId;

    var autoPlayFirstMove = function () {
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
        return {row: randomFirstMove[0], column: randomFirstMove[1]};
    }

    var autoPlayToWinWithOneMove = function () {
        var winningMoves = getWinningMoves();
        if (winningMoves.length > 0)
            return {row: winningMoves[0][0], column: winningMoves[0][1]};

        return null;
    }

    var autoPlayToBlockWinningOpponent = function () {
        var imaginaryOpponent = new Player(game, opponentId);
        var opponentWinningMoves = imaginaryOpponent.computer.getWinningMoves();
        if (opponentWinningMoves.length > 0)
            return {row: opponentWinningMoves[0][0], column: opponentWinningMoves[0][1]};

        return null;
    }

    var autoPlayToFork = function () {
        var forkingType1Moves = getForkingMoves(1);
        if (forkingType1Moves.length > 0)
            return {row: forkingType1Moves[0][0], column: forkingType1Moves[0][1]};

        var forkingType2Moves = getForkingMoves(2);
        if (forkingType2Moves.length > 0)
            return {row: forkingType2Moves[0][0], column: forkingType2Moves[0][1]};

        return null;
    }

    var autoPlayToBlockFork = function () {
        var imaginaryOpponent = new Player(game, opponentId);
        var opponentPlayerForkingMoves = imaginaryOpponent.computer.getForkingMoves();
        if (opponentPlayerForkingMoves.length > 0)
            if (imaginaryOpponent.computer.getForkType() == 1)
                return {row: opponentPlayerForkingMoves[0][0], column: opponentPlayerForkingMoves[0][1]};
            else
                return getRandomForkType2BlockingMove();

        return null;
    }

    var getAllPossibleForkType2BlockingMove = function () {
        var allRandomForkType2BlockingMoves = [
            [1, 2],
            [2, 1],
            [3, 2],
            [2, 3]
        ];

        var randomForkType2BlockingMoves = [];

        for (var i in allRandomForkType2BlockingMoves)
            if (game.isCellOccupied(allRandomForkType2BlockingMoves[i][0], allRandomForkType2BlockingMoves[i][1]) === false)
                randomForkType2BlockingMoves.push(allRandomForkType2BlockingMoves[i]);

        return randomForkType2BlockingMoves;
    }

    var getForkMovesWithWinningOpportunities = function(randomForkType2BlockingMoves){
        for (var i in randomForkType2BlockingMoves) {
            var imaginaryGame = getImaginaryGameWithTheSameBoard();
            var imaginaryPlayer = new Player(imaginaryGame, playerId);
            imaginaryPlayer.play(randomForkType2BlockingMoves[i][0], randomForkType2BlockingMoves[i][1]);
            if (imaginaryPlayer.getWinningMoves().length === 0)
                randomForkType2BlockingMoves.splice(i, 1);
        }
        return randomForkType2BlockingMoves;
    }

    var getRandomForkType2BlockingMove = function () {
        var allForkType2BlockingMoves = getAllPossibleForkType2BlockingMove();
        var forkMovesWithWinningOpportunities = getForkMovesWithWinningOpportunities(allForkType2BlockingMoves);
        var randomForkType2BlockingMove = forkMovesWithWinningOpportunities[Math.floor(Math.random() * forkMovesWithWinningOpportunities.length)];
        return {row: randomForkType2BlockingMove[0], column: randomForkType2BlockingMove[1]};
    }


    var autoPlayCenter = function () {
        if (game.isCellOccupied(2, 2) == false)
            return {row: 2, column: 2};

        return null;
    }

    var autoPlayCorner = function () {
        if (game.isCellOccupied(1, 1) == false)
            return {row: 1, column: 1};

        if (game.isCellOccupied(1, 3) == false)
            return {row: 1, column: 3};

        if (game.isCellOccupied(3, 1) == false)
            return {row: 3, column: 1};

        if (game.isCellOccupied(3, 1) == false)
            return {row: 3, column: 1};

        return null;
    }

    var autoPlayFillTheLastPossibleCell = function () {
        var allPossibleMoves = getAllPossibleMoves();
        if (allPossibleMoves.length === 1)
            return {row: allPossibleMoves[0][0], column: allPossibleMoves[0][1]};

    }

    var getAllPossibleMoves = function () {
        var board = game.getBoard();
        var allPossibleMoves = [];
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
                if (board[row][col] === null)
                    allPossibleMoves.push([row + 1, col + 1]);

            }
        }
        return allPossibleMoves;
    }

    var getWinningMoves = function () {
        var winningMoves = [];
        var allPossibleMoves = getAllPossibleMoves();
        for (i in allPossibleMoves) {
            var possibleMove = allPossibleMoves[i];
            if (tryMoveForWin(possibleMove[0], possibleMove[1]) === true)
                winningMoves.push(possibleMove);
        }
        return winningMoves;
    }

    var getForkingMoves = function () {
        var forkMoves = [];
        var allPossibleMoves = getAllPossibleMoves();
        for (i in allPossibleMoves) {
            var possibleMove = allPossibleMoves[i];
            if (tryMoveForMultipleWinOpportunity(possibleMove[0], possibleMove[1]) === true)
                forkMoves.push(possibleMove);

        }
        return forkMoves;
    }

    var getForkType = function () {
        var board = game.getBoard();
        if (board[1][1] != null && board[1][1] != shape)
            return 2;
        else
            return 1;
    }

    var tryMoveForWin = function (row, column) {
        var imaginaryGame = getImaginaryGameWithTheSameBoard();
        var imagineRyPlayer = new Player(imaginaryGame, playerId);
        var currentBoard = getBoardClone();
        imagineRyPlayer.play(row, column);
        var gameStatus = imaginaryGame.getGameStatus();
        game.setBoard(currentBoard);
        if (gameStatus.isGameOver === true && gameStatus.gameResult === 'win' && gameStatus.winnerShape === shape)
            return true;
        return false;
    }

    var tryMoveForMultipleWinOpportunity = function (row, column) {
        var imaginaryGame = getImaginaryGameWithTheSameBoard();
        var imaginaRyPlayer = new Player(imaginaryGame, playerId);
        var currentBoard = getBoardClone();
        imaginaRyPlayer.play(row, column);
        var winningMovesAfterMove = imaginaRyPlayer.computer.getWinningMoves();
        game.setBoard(currentBoard);
        if (winningMovesAfterMove.length > 1)
            return true;
        return false;
    }

    function getImaginaryGameWithTheSameBoard() {
        var imaginaryGame = new TicTacToe();
        imaginaryGame.setBoard(getBoardClone());
        return imaginaryGame;
    }


    var getBoardClone = function () {
        var board = game.getBoard();
        return [
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]]
        ];
    }

    var hint = function () {
        var hint = autoPlayFirstMove();
        if (hint != null)
            return hint;

        hint = autoPlayToWinWithOneMove();
        if (hint != null)
            return hint;

        hint = autoPlayToBlockWinningOpponent();
        if (hint != null)
            return hint;

        hint = autoPlayToFork();
        if (hint != null)
            return hint;

        hint = autoPlayToBlockFork();
        if (hint != null)
            return hint;

        hint = autoPlayCenter();
        if (hint != null)
            return hint;

        hint = autoPlayCorner();
        if (hint != null)
            return hint;

        hint = autoPlayFillTheLastPossibleCell();
        if (hint != null)
            return hint;

        return null;
    }

    return {
        hint: hint,
        getWinningMoves: getWinningMoves,
        getForkingMoves: getForkingMoves,
        getForkType: getForkType
    }
};
