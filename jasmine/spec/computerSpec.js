describe("Computer", function () {

    var ticTacToe;
    var player1;
    var player2;

    describe("When hinting a player", function () {

        describe("and it's the turn in the game", function () {
            it("A corner or center is randomly played", function () {
                for (var i = 0; i < 10; i++) {
                    ticTacToe = new TicTacToe();
                    player1 = new Player(ticTacToe, 1);
                    player1.autoPlay();
                    var board = ticTacToe.getBoard();
                    var shape = player1.getShape();
                    var isCornerOrCellOccupied = board[0][0] == shape || board[0][2] == shape || board[1][1] == shape || board[2][0] == shape || board[2][2] == shape;
                    expect(isCornerOrCellOccupied).toBeTruthy();
                }
            });
        });

        describe("and game can be won with one move", function () {
            beforeEach(function () {
                ticTacToe = new TicTacToe();
                player1 = new Player(ticTacToe, 1);
                player2 = new Player(ticTacToe, 2);
            });

            it("Game is won when a vertical 1 win is possible", function () {
                player1.play(1, 1);
                player2.play(1, 2);
                player1.play(3, 1);
                player2.play(2, 2);
                player1.autoPlay();
                expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
                expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
                expect(ticTacToe.getGameStatus().winnerLineType).toEqual('vertical');
                expect(ticTacToe.getGameStatus().winnerLineNumber).toEqual(1);
                expect(ticTacToe.getGameStatus().winnerShape).toEqual(player1.getShape());
            });

            it("Game is won when a horizontal 2 win is possible", function () {
                player1.play(2, 1);
                player2.play(3, 2);
                player1.play(2, 2);
                player2.play(3, 3);
                player1.autoPlay();
                expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
                expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
                expect(ticTacToe.getGameStatus().winnerLineType).toEqual('horizontal');
                expect(ticTacToe.getGameStatus().winnerLineNumber).toEqual(2);
                expect(ticTacToe.getGameStatus().winnerShape).toEqual(player1.getShape());
            });

            it("Game is won when a diagonal 1 win is possible", function () {
                player1.play(1, 1);
                player2.play(1, 2);
                player1.play(2, 2);
                player2.play(1, 3);
                player1.autoPlay();
                expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
                expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
                expect(ticTacToe.getGameStatus().winnerLineType).toEqual('diagonal');
                expect(ticTacToe.getGameStatus().winnerLineNumber).toEqual(1);
                expect(ticTacToe.getGameStatus().winnerShape).toEqual(player1.getShape());
            });

            it("Game is won when a diagonal 2 is possible", function () {
                player1.play(1, 3);
                player2.play(2, 1);
                player1.play(3, 1);
                player2.play(3, 2);
                player1.autoPlay();
                expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
                expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
                expect(ticTacToe.getGameStatus().winnerLineType).toEqual('diagonal');
                expect(ticTacToe.getGameStatus().winnerLineNumber).toEqual(2);
                expect(ticTacToe.getGameStatus().winnerShape).toEqual(player1.getShape());
            });
        });


        describe("and blocking a win by opponent is possible", function () {
            beforeEach(function () {
                ticTacToe = new TicTacToe();
                player1 = new Player(ticTacToe, 1);
                player2 = new Player(ticTacToe, 2);
            });

            it("The opponent is blocked a vertical 2 win", function () {
                player1.play(1, 1);
                player2.play(2, 2);
                player1.play(3, 1);
                player2.play(2, 1);
                player1.autoPlay();
                var board = ticTacToe.getBoard();
                var isOpponentBlocked = board[1][2] == player1.getShape();
                expect(isOpponentBlocked).toBeTruthy();
            });

            it("The opponent is blocked a horizontal 2 win", function () {
                player1.play(1, 1);
                player2.play(2, 1);
                player1.play(3, 1);
                player2.play(2, 3);
                player1.autoPlay();
                var board = ticTacToe.getBoard();
                var isOpponentBlocked = board[1][1] == player1.getShape();
                expect(isOpponentBlocked).toBeTruthy();
            });

            it("The opponent is blocked a diagonal 2 win", function () {
                player1.play(2, 2);
                player2.play(1, 2);
                player1.play(3, 1);
                player2.autoPlay();
                var board = ticTacToe.getBoard();
                var isOpponentBlocked = board[0][2] == player2.getShape();
                expect(isOpponentBlocked).toBeTruthy();
            });

            it("The opponent is blocked after a mishandled right fork", function () {
                player1.play(1, 1);
                player2.play(1, 3);
                player1.play(2, 1);
                player2.play(3, 1);
                player1.autoPlay();
                var board = ticTacToe.getBoard();
                var isOpponentBlocked = board[1][1] == player1.getShape();
                expect(isOpponentBlocked).toBeTruthy();
            });
        });

        describe("and forking is possible, then fork", function () {
            beforeEach(function () {
                ticTacToe = new TicTacToe();
                player1 = new Player(ticTacToe, 1);
                player2 = new Player(ticTacToe, 2);
            });

            it("Left fork opportunity is exploited", function () {
                player1.play(2, 2);
                player2.play(1, 2);
                player1.play(1, 1);
                player2.play(3, 3);
                player1.autoPlay();
                var board = ticTacToe.getBoard();
                var isOpponentBlocked = board[2][0] == player1.getShape() || board[1][0] == player1.getShape();
                expect(isOpponentBlocked).toBeTruthy();
            });

            it("Right fork opportunity is exploited", function () {
                player1.play(2, 2);
                player2.play(1, 2);
                player1.play(3, 1);
                player2.play(1, 3);
                player1.autoPlay();
                var board = ticTacToe.getBoard();
                var isOpponentBlocked = board[0][0] == player1.getShape() || board[1][0] == player1.getShape();
                expect(isOpponentBlocked).toBeTruthy();
            });
        });

        describe("and blocking opponent forking is possible, then block", function () {
            beforeEach(function () {
                ticTacToe = new TicTacToe();
                player1 = new Player(ticTacToe, 1);
                player2 = new Player(ticTacToe, 2);
            });

            it("Left fork type 1 opportunity for opponent is blocked", function () {
                player1.play(2, 2);
                player2.play(3, 1);
                player1.play(1, 3);
                player2.autoPlay();
                var board = ticTacToe.getBoard();
                var isOpponentBlocked = board[0][0] == player2.getShape() || board[2][2] == player2.getShape();
                expect(isOpponentBlocked).toBeTruthy();
            });

            it("Right fork type 1 opportunity for opponent is blocked", function () {
                player1.play(2, 2);
                player2.play(1, 1);
                player1.play(3, 3);
                player2.autoPlay();
                var board = ticTacToe.getBoard();
                var isOpponentBlocked = board[0][2] == player2.getShape() || board[2][0] == player2.getShape();
                expect(isOpponentBlocked).toBeTruthy();
            });

            it("Left fork type 2 opportunity for opponent is blocked", function () {
                player1.play(1, 3);
                player2.play(2, 2);
                player1.play(3, 1);
                player2.autoPlay();
                var board = ticTacToe.getBoard();
                var isOpponentBlocked = board[0][1] == player2.getShape() || board[1][0] == player2.getShape() || board[2][1] == player2.getShape() || board[1][2] == player2.getShape();
                expect(isOpponentBlocked).toBeTruthy();
            });

            it("Right fork type 2 opportunity for opponent is blocked", function () {
                player1.play(1, 1);
                player2.play(2, 2);
                player1.play(3, 3);
                player2.autoPlay();
                var board = ticTacToe.getBoard();
                var isOpponentBlocked = board[0][1] == player2.getShape() || board[1][0] == player2.getShape() || board[2][1] == player2.getShape() || board[1][2] == player2.getShape();
                expect(isOpponentBlocked).toBeTruthy();
            });

            it("Left fork type 3 opportunity for opponent is blocked", function () {
                player1.play(1, 2);
                player2.play(2, 2);
                player1.play(2, 1);
                player2.autoPlay();
                var board = ticTacToe.getBoard();
                var isOpponentBlocked = board[0][0] == player2.getShape() ;
                expect(isOpponentBlocked).toBeTruthy();
            });

            it("Right fork type 3 opportunity for opponent is blocked", function () {
                player1.play(3, 2);
                player2.play(2, 2);
                player1.play(2, 3);
                player2.autoPlay();
                var board = ticTacToe.getBoard();
                var isOpponentBlocked = board[2][2] == player2.getShape();
                expect(isOpponentBlocked).toBeTruthy();
            });
        });

        describe("and center is not occupied", function () {
            beforeEach(function () {
                ticTacToe = new TicTacToe();
                player1 = new Player(ticTacToe, 1);
                player2 = new Player(ticTacToe, 2);
            });

            it("play center", function () {
                player1.play(1, 2);
                player2.play(3, 2);
                player1.autoPlay();
                var board = ticTacToe.getBoard();
                var isOpponentBlocked = board[1][1] == player1.getShape();
                expect(isOpponentBlocked).toBeTruthy();
            });
        });

        describe("and a corner is not occupied", function () {
            beforeEach(function () {
                ticTacToe = new TicTacToe();
                player1 = new Player(ticTacToe, 1);
                player2 = new Player(ticTacToe, 2);
            });

            it("play corner", function () {
                player2.play(2, 2);
                player1.autoPlay();
                var board = ticTacToe.getBoard();
                var isOpponentBlocked = board[0][0] == player1.getShape() || board[2][2] == player1.getShape() || board[0][2] == player1.getShape() || board[2][0] == player1.getShape();
                expect(isOpponentBlocked).toBeTruthy();
            });
        });

        describe("and it's the last turn in the game", function () {
            beforeEach(function () {
                ticTacToe = new TicTacToe();
                player1 = new Player(ticTacToe, 1);
                player2 = new Player(ticTacToe, 2);
            });

            it("The last possible move is played", function () {
                player1.play(1, 1);
                player2.play(3, 1);
                player1.play(1, 3);
                player2.play(1, 2);
                player1.play(2, 2);
                player2.play(3, 3);
                player1.play(3, 2);
                player2.play(2, 3);
                player1.autoPlay();
                expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
                expect(ticTacToe.getGameStatus().gameResult).toEqual('draw');
                expect(ticTacToe.getGameStatus().winnerLineType).toEqual(null);
                expect(ticTacToe.getGameStatus().winnerLineNumber).toEqual(null);
                expect(ticTacToe.getGameStatus().winnerShape).toEqual(null);
            });
        });

    });


});