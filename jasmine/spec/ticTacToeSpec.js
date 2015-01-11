describe("TicTacToe", function () {
    var ticTacToe;

    beforeEach(function () {
        ticTacToe = new TicTacToe();
        emptyBoard = [[null, null, null], [null, null, null], [null, null, null]];
    });

    it("Should have an empty board in a new game", function () {
        expect(ticTacToe.getBoard()).toEqual(emptyBoard);
    });

    it("Game should not be over in a new game", function () {
        expect(ticTacToe.isGameOver).toBeFalsy();
    });

    describe("When first move has been made", function () {
        beforeEach(function () {
            ticTacToe.play(1, [1, 1]);
        });

        it("one change has happened to the board", function () {
            var changedBoard = [
                ['x', null, null],
                [null, null, null],
                [null, null, null]
            ];
            expect(ticTacToe.getBoard()).toEqual(changedBoard);
        });

        it("Game should not be over after the first game", function () {
            expect(ticTacToe.getGameStatus().isGameOver).toBeFalsy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual(null);
        });

        it("Game should not have a winner after the first game", function () {
            expect(ticTacToe.getGameStatus().winner).toEqual(null);
        });
    });

    describe("When a player wins", function () {
        beforeEach(function () {
            ticTacToe = new TicTacToe();
        });

        it("Game is over with Horizontal l win", function () {
            ticTacToe.play(1, [1, 1]);
            ticTacToe.play(2, [2, 1]);
            ticTacToe.play(1, [1, 2]);
            ticTacToe.play(2, [2, 2]);
            ticTacToe.play(1, [1, 3]);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
        });

        it("Game is over with Horizontal 2 win", function () {
            ticTacToe.play(1, [2, 1]);
            ticTacToe.play(2, [3, 1]);
            ticTacToe.play(1, [2, 2]);
            ticTacToe.play(2, [3, 2]);
            ticTacToe.play(1, [2, 3]);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
        });

        it("Game is over with Horizontal 3 win", function () {
            ticTacToe.play(1, [3, 1]);
            ticTacToe.play(2, [2, 1]);
            ticTacToe.play(1, [3, 2]);
            ticTacToe.play(2, [2, 2]);
            ticTacToe.play(1, [3, 3]);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
        });

        it("Game is over with a Vertical 1 win", function () {
            ticTacToe.play(1, [1, 1]);
            ticTacToe.play(2, [2, 2]);
            ticTacToe.play(1, [2, 1]);
            ticTacToe.play(2, [3, 3]);
            ticTacToe.play(1, [3, 1]);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
        });

        it("Game is over with a Vertical 2 win", function () {
            ticTacToe.play(1, [1, 2]);
            ticTacToe.play(2, [2, 3]);
            ticTacToe.play(1, [2, 2]);
            ticTacToe.play(2, [3, 3]);
            ticTacToe.play(1, [3, 2]);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
        });

        it("Game is over with a Vertical 3 win", function () {
            ticTacToe.play(1, [1, 3]);
            ticTacToe.play(2, [2, 2]);
            ticTacToe.play(1, [2, 3]);
            ticTacToe.play(2, [1, 1]);
            ticTacToe.play(1, [3, 3]);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
        });

        it("Game is over with a Diagonal 1 win", function () {
            ticTacToe.play(1, [1, 1]);
            ticTacToe.play(2, [2, 1]);
            ticTacToe.play(1, [2, 2]);
            ticTacToe.play(2, [3, 1]);
            ticTacToe.play(1, [3, 3]);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
        });

        it("Game is over with a Diagonal 2 win", function () {
            ticTacToe.play(1, [1, 3]);
            ticTacToe.play(2, [2, 1]);
            ticTacToe.play(1, [2, 2]);
            ticTacToe.play(2, [3, 2]);
            ticTacToe.play(1, [3, 1]);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
        });

        it("Game can not be played anymore", function () {
            ticTacToe.play(1, [1, 1]);
            ticTacToe.play(2, [2, 1]);
            ticTacToe.play(1, [1, 2]);
            ticTacToe.play(2, [2, 2]);
            ticTacToe.play(1, [1, 3]);
            expect(function () {
                ticTacToe.play(1, [1, 1]);
            }).toThrow(
                new Error("Playing is not possible, game is over")
            );
        });

        it("There's a winner", function () {
            ticTacToe.play(1, [1, 1]);
            ticTacToe.play(2, [2, 1]);
            ticTacToe.play(1, [1, 3]);
            ticTacToe.play(2, [2, 2]);
            ticTacToe.play(1, [1, 2]);
            expect(ticTacToe.getGameStatus().winner).not.toEqual(null);
        });
    });


    describe("When there is a draw", function () {
        beforeEach(function () {
            ticTacToe = new TicTacToe();
        });

        it("Game is over with a draw", function () {
            ticTacToe.play(1, [1, 1]);
            ticTacToe.play(2, [1, 2]);
            ticTacToe.play(1, [1, 3]);
            ticTacToe.play(2, [2, 2]);
            ticTacToe.play(1, [3, 2]);
            ticTacToe.play(2, [2, 3]);
            ticTacToe.play(1, [2, 1]);
            ticTacToe.play(2, [3, 1]);
            ticTacToe.play(1, [3, 3]);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('draw');
        });

        it("Game can not be played anymore", function () {
            ticTacToe.play(1, [1, 1]);
            ticTacToe.play(2, [1, 2]);
            ticTacToe.play(1, [1, 3]);
            ticTacToe.play(2, [2, 2]);
            ticTacToe.play(1, [3, 2]);
            ticTacToe.play(2, [2, 3]);
            ticTacToe.play(1, [2, 1]);
            ticTacToe.play(2, [3, 1]);
            ticTacToe.play(1, [3, 3]);
            expect(function () {
                ticTacToe.play(1, [1, 1]);
            }).toThrow(
                new Error("Playing is not possible, game is over")
            );
        });

        it("There's no winner", function () {
            ticTacToe.play(1, [1, 1]);
            ticTacToe.play(2, [1, 2]);
            ticTacToe.play(1, [1, 3]);
            ticTacToe.play(2, [2, 2]);
            ticTacToe.play(1, [3, 2]);
            ticTacToe.play(2, [2, 3]);
            ticTacToe.play(1, [2, 1]);
            ticTacToe.play(2, [3, 1]);
            ticTacToe.play(1, [3, 3]);
            expect(ticTacToe.getGameStatus().winner).toEqual(null);
        });
    });

    describe("When a player is auto playing and game can be one with one move", function () {
        beforeEach(function () {
            ticTacToe = new TicTacToe();
        });

        it("Game is won when a vertical 1 win is possible", function () {
            ticTacToe.play(1, [1, 1]);
            ticTacToe.play(2, [1, 2]);
            ticTacToe.play(1, [1, 3]);
            ticTacToe.play(2, [2, 2]);
            ticTacToe.play(1, [3, 2]);
            ticTacToe.play(2, [2, 3]);
            ticTacToe.play(1, [2, 1]);
            ticTacToe.play(2, [3, 3]);
            ticTacToe.autoPlay(1);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
            expect(ticTacToe.getGameStatus().winnerLineType).toEqual('vertical');
            expect(ticTacToe.getGameStatus().winnerLineNumber).toEqual(1);
            expect(ticTacToe.getGameStatus().winner).toEqual(1);
        });

        it("Game is won when a horizontal 2 win is possible", function () {
            ticTacToe.play(1, [2, 1]);
            ticTacToe.play(2, [3, 2]);
            ticTacToe.play(1, [2, 2]);
            ticTacToe.play(2, [3, 3]);
            ticTacToe.autoPlay(1);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
            expect(ticTacToe.getGameStatus().winnerLineType).toEqual('horizontal');
            expect(ticTacToe.getGameStatus().winnerLineNumber).toEqual(2);
            expect(ticTacToe.getGameStatus().winner).toEqual(1);
        });

        it("Game is won when a diagonal 1 win is possible", function () {
            ticTacToe.play(1, [1, 1]);
            ticTacToe.play(2, [1, 2]);
            ticTacToe.play(1, [2, 2]);
            ticTacToe.play(2, [1, 3]);
            ticTacToe.autoPlay(1);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
            expect(ticTacToe.getGameStatus().winnerLineType).toEqual('diagonal');
            expect(ticTacToe.getGameStatus().winnerLineNumber).toEqual(1);
            expect(ticTacToe.getGameStatus().winner).toEqual(1);
        });

        it("Game is won when a diagonal 2 is possible", function () {
            ticTacToe.play(1, [1, 3]);
            ticTacToe.play(2, [2, 1]);
            ticTacToe.play(1, [3, 1]);
            ticTacToe.play(2, [3, 2]);
            ticTacToe.autoPlay(1);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
            expect(ticTacToe.getGameStatus().winnerLineType).toEqual('diagonal');
            expect(ticTacToe.getGameStatus().winnerLineNumber).toEqual(2);
            expect(ticTacToe.getGameStatus().winner).toEqual(1);
        });
    });

    describe("When a player is auto playing and there is only one possible move", function () {
        beforeEach(function () {
            ticTacToe = new TicTacToe();
        });

        it("The last possible move is played", function () {
            ticTacToe.play(1, [1, 1]);
            ticTacToe.play(2, [3, 1]);
            ticTacToe.play(1, [1, 3]);
            ticTacToe.play(2, [1, 2]);
            ticTacToe.play(1, [2, 2]);
            ticTacToe.play(2, [3, 3]);
            ticTacToe.play(1, [3, 2]);
            ticTacToe.play(2, [2, 3]);
            ticTacToe.autoPlay(1);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('draw');
            expect(ticTacToe.getGameStatus().winnerLineType).toEqual(null);
            expect(ticTacToe.getGameStatus().winnerLineNumber).toEqual(null);
            expect(ticTacToe.getGameStatus().winner).toEqual(null);
        });
    });


    describe("When a player is auto playing and it's the first move", function () {
        beforeEach(function () {
            ticTacToe = new TicTacToe();
        });

        it("A corner or center is randomly played", function () {
            ticTacToe.autoPlay(1);
            var board = ticTacToe.getBoard();
            var shape = 'x';
            var isCornerOrCellOccupied = board[0][0] == shape || board[0][2] == shape || board[1][1] == shape || board[2][0] == shape || board[2][2] == shape;
            expect(isCornerOrCellOccupied).toBeTruthy();
        });
    });

});