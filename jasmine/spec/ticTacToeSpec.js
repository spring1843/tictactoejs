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

    describe("When first move is made", function () {
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

    describe("When a winning move is made", function () {
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


    describe("When Auto Playing", function () {

        describe("and it's the turn in the game", function () {
            it("A corner or center is randomly played", function () {
                for (var i = 0; i < 10; i++) {
                    ticTacToe = new TicTacToe();
                    ticTacToe.autoPlay(1);
                    var board = ticTacToe.getBoard();
                    var shape = 'x';
                    var isCornerOrCellOccupied = board[0][0] == shape || board[0][2] == shape || board[1][1] == shape || board[2][0] == shape || board[2][2] == shape;
                    expect(isCornerOrCellOccupied).toBeTruthy();
                }
            });
        });

        describe("and game can be won with one move", function () {
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


        describe("and blocking a win by opponent is possible", function () {
            beforeEach(function () {
                ticTacToe = new TicTacToe();
            });

            it("The opponent is blocked a vertical 2 win", function () {
                ticTacToe.play(1, [1, 1]);
                ticTacToe.play(2, [2, 2]);
                ticTacToe.play(1, [3, 1]);
                ticTacToe.play(2, [2, 1]);
                ticTacToe.autoPlay(1);
                var board = ticTacToe.getBoard();
                var shape = 'x';
                var isOpponentBlocked = board[1][2] == shape;
                expect(isOpponentBlocked).toBeTruthy();
            });

            it("The opponent is blocked a horizontal 2 win", function () {
                ticTacToe.play(1, [1, 1]);
                ticTacToe.play(2, [2, 1]);
                ticTacToe.play(1, [3, 1]);
                ticTacToe.play(2, [2, 3]);
                ticTacToe.autoPlay(1);
                var board = ticTacToe.getBoard();
                var shape = 'x';
                var isOpponentBlocked = board[1][1] == shape;
                expect(isOpponentBlocked).toBeTruthy();
            });

            it("The opponent is blocked a diagonal 2 win", function () {
                ticTacToe.play(1, [2, 2]);
                ticTacToe.play(2, [1, 2]);
                ticTacToe.play(1, [3, 1]);
                ticTacToe.autoPlay(2);
                var board = ticTacToe.getBoard();
                var shape = 'o';
                var isOpponentBlocked = board[0][2] == shape;
                expect(isOpponentBlocked).toBeTruthy();
            });

            it("The opponent is blocked after a mishandled right fork", function () {
                ticTacToe.play(1, [1, 1]);
                ticTacToe.play(2, [1, 3]);
                ticTacToe.play(1, [2, 1]);
                ticTacToe.play(2, [3, 1]);
                ticTacToe.autoPlay(1);
                var board = ticTacToe.getBoard();
                var shape = 'x';
                var isOpponentBlocked = board[1][1] == shape;
                expect(isOpponentBlocked).toBeTruthy();
            });
        });

        describe("and blocking opponent forking is possible, then block fork", function () {
            beforeEach(function () {
                ticTacToe = new TicTacToe();
            });

            it("Left fork opportunity for opponent is blocked", function () {
                ticTacToe.play(1, [2, 2]);
                ticTacToe.play(2, [3, 1]);
                ticTacToe.play(1, [1, 3]);
                ticTacToe.autoPlay(2);
                var board = ticTacToe.getBoard();
                var shape = 'o';
                var isOpponentBlocked = board[0][0] == shape || board[2][2] == shape;
                expect(isOpponentBlocked).toBeTruthy();
            });

            it("Right fork opportunity for opponent is blocked", function () {
                ticTacToe.play(1, [2, 2]);
                ticTacToe.play(2, [1, 1]);
                ticTacToe.play(1, [3, 3]);
                ticTacToe.autoPlay(2);
                var board = ticTacToe.getBoard();
                var shape = 'o';
                var isOpponentBlocked = board[0][2] == shape || board[2][0] == shape;
                expect(isOpponentBlocked).toBeTruthy();
            });
        });

        describe("and forking is possible, then fork", function () {
            beforeEach(function () {
                ticTacToe = new TicTacToe();
            });

            it("Left fork opportunity is exploited", function () {
                ticTacToe.play(1, [2, 2]);
                ticTacToe.play(2, [1, 2]);
                ticTacToe.play(1, [1, 1]);
                ticTacToe.play(2, [3, 3]);
                ticTacToe.autoPlay(1);
                var board = ticTacToe.getBoard();
                var shape = 'x';
                var isOpponentBlocked = board[2][0] == shape || board[1][0] == shape;
                expect(isOpponentBlocked).toBeTruthy();
            });

            it("Right fork opportunity is exploited", function () {
                ticTacToe.play(1, [2, 2]);
                ticTacToe.play(2, [1, 2]);
                ticTacToe.play(1, [3, 1]);
                ticTacToe.play(2, [1, 3]);
                ticTacToe.autoPlay(1);
                var board = ticTacToe.getBoard();
                var shape = 'x';
                var isOpponentBlocked = board[0][0] == shape || board[1][0] == shape;
                expect(isOpponentBlocked).toBeTruthy();
            });
        });

        describe("and it's the last turn in the game", function () {
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

    });


});