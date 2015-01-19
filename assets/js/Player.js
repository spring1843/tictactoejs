var Player = function (game, playerId) {

    var playerId = playerId;
    var game = game;

    var play = function (row, column) {
        var shape = getShape();
        game.changeCell(row, column, shape);
    }

    var getShape = function () {
        if (playerId === 1)
            return 'x';
        else
            return 'o';

    }

    var getPlayerFromShape = function (shape) {
        if (shape === 'x')
            return 1;
        else
            return 2;
    }

    var getOpponentId = function () {
        if (playerId === 1)
            return 2;
        else
            return 1;
    }

    var getOpponentShape = function(){
        if (playerId === 1)
            return 'o';
        else
            return 'x';
    }

    var computer = new Computer(game, playerId, getShape(), getOpponentId(), getOpponentShape());

    var autoPlay = function () {
        var hint = computer.hint();
        if (hint === null)
            throw new exceptions.ComputerCouldNotHint();
        else
            play(hint.row, hint.column);
    }

    var exceptions = {
        ComputerCouldNotHint: function () {
            throw new Error("Computer could not hint");
        }
    }

    return {
        play: play,
        autoPlay: autoPlay,
        computer: computer,
        hint: computer.hint,
        exceptions: exceptions,
        getWinningMoves: computer.getWinningMoves,
        getForkingMoves: computer.getForkingMoves,
        getPlayerFromShape: getPlayerFromShape,
        getShape: getShape,
        getOpponentId: getOpponentId
    }
};