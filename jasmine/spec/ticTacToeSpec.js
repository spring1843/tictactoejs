describe("TicTacToe", function () {
    var ticTacToe;
    var player1;
    var player2;

    beforeEach(function () {
        ticTacToe = new TicTacToe();
        player1 = new Player(ticTacToe, 1);
        player2 = new Player(ticTacToe, 2);

        emptyBoard = [[null, null, null], [null, null, null], [null, null, null]];
    });

    it("Should have an empty board in a new game", function () {
        expect(ticTacToe.getBoard()).toEqual(emptyBoard);
    });

    it("Game should not be over in a new game", function () {
        expect(ticTacToe.isGameOver).toBeFalsy();
    });

    describe("When first move is made", function () {
        beforeEach(function () {
            player1.play(1, 1);
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
            expect(ticTacToe.getGameStatus().winnerShape).toEqual(null);
        });
    });

    describe("When a winning move is made", function () {
        beforeEach(function () {
            ticTacToe = new TicTacToe();
            player1 = new Player(ticTacToe, 1);
            player2 = new Player(ticTacToe, 2);
        });

        it("Game is over with Horizontal l win", function () {
            player1.play(1, 1);
            player2.play(2, 1);
            player1.play(1, 2);
            player2.play(2, 2);
            player1.play(1, 3);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
        });

        it("Game is over with Horizontal 2 win", function () {
            player1.play(2, 1);
            player2.play(3, 1);
            player1.play(2, 2);
            player2.play(3, 2);
            player1.play(2, 3);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
        });

        it("Game is over with Horizontal 3 win", function () {
            player1.play(3, 1);
            player2.play(2, 1);
            player1.play(3, 2);
            player2.play(2, 2);
            player1.play(3, 3);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
        });

        it("Game is over with a Vertical 1 win", function () {
            player1.play(1, 1);
            player2.play(2, 2);
            player1.play(2, 1);
            player2.play(3, 3);
            player1.play(3, 1);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
        });

        it("Game is over with a Vertical 2 win", function () {
            player1.play(1, 2);
            player2.play(2, 3);
            player1.play(2, 2);
            player2.play(3, 3);
            player1.play(3, 2);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
        });

        it("Game is over with a Vertical 3 win", function () {
            player1.play(1, 3);
            player2.play(2, 2);
            player1.play(2, 3);
            player2.play(1, 1);
            player1.play(3, 3);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
        });

        it("Game is over with a Diagonal 1 win", function () {
            player1.play(1, 1);
            player2.play(2, 1);
            player1.play(2, 2);
            player2.play(3, 1);
            player1.play(3, 3);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
        });

        it("Game is over with a Diagonal 2 win", function () {
            player1.play(1, 3);
            player2.play(2, 1);
            player1.play(2, 2);
            player2.play(3, 2);
            player1.play(3, 1);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
        });

        it("Game can not be played anymore", function () {
            player1.play(1, 1);
            player2.play(2, 1);
            player1.play(1, 2);
            player2.play(2, 2);
            player1.play(1, 3);
            expect(function () {
                player1.play(1, 1);
            }).toThrow(
                new Error("Playing is not possible, game is over")
            );
        });

        it("There's a winner", function () {
            player1.play(1, 1);
            player2.play(2, 1);
            player1.play(1, 3);
            player2.play(2, 2);
            player1.play(1, 2);
            expect(ticTacToe.getGameStatus().winnerShape).not.toEqual('null');
        });
    });


    describe("When there is a draw", function () {
        beforeEach(function () {
            ticTacToe = new TicTacToe();
            player1 = new Player(ticTacToe, 1);
            player2 = new Player(ticTacToe, 2);
        });

        it("Game is over with a draw", function () {
            player1.play(1, 1);
            player2.play(1, 2);
            player1.play(1, 3);
            player2.play(2, 2);
            player1.play(3, 2);
            player2.play(2, 3);
            player1.play(2, 1);
            player2.play(3, 1);
            player1.play(3, 3);
            expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
            expect(ticTacToe.getGameStatus().gameResult).toEqual('draw');
        });

        it("Game can not be played anymore", function () {
            player1.play(1, 1);
            player2.play(1, 2);
            player1.play(1, 3);
            player2.play(2, 2);
            player1.play(3, 2);
            player2.play(2, 3);
            player1.play(2, 1);
            player2.play(3, 1);
            player1.play(3, 3);
            expect(function () {
                player1.play(1, 1);
            }).toThrow(
                new Error("Playing is not possible, game is over")
            );
        });

        it("There's no winner", function () {
            player1.play(1, 1);
            player2.play(1, 2);
            player1.play(1, 3);
            player2.play(2, 2);
            player1.play(3, 2);
            player2.play(2, 3);
            player1.play(2, 1);
            player2.play(3, 1);
            player1.play(3, 3);
            expect(ticTacToe.getGameStatus().winnerShape).toEqual(null);
        });
    });


});