describe("Player", function () {


    var ticTacToe;
    var player1;
    var player2;

    beforeEach(function () {
        ticTacToe = new TicTacToe();
        player1 = new Player(ticTacToe, 1);
        player2 = new Player(ticTacToe, 2);

        emptyBoard = [[null, null, null], [null, null, null], [null, null, null]];
    });

    it("Player 1 and 2 have different shapes", function () {
        expect(player1.getShape()).not.toEqual(player2.getShape());
    });

    it("Player 1 and 2 are each others opponents", function () {
        expect(player1.getOpponentId()).toEqual(2);
        expect(player2.getOpponentId()).toEqual(1);
    });


});