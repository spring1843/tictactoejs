describe("TicTacToe", function() {
  var ticTacToe;

  beforeEach(function() {
    ticTacToe = new TicTacToe;
    emptyBoard = [ [ null, null, null ], [ null, null, null ], [ null, null, null ] ] ;
  });

  it("Should have an empty board in a new game", function() {
    expect(ticTacToe.board).toEqual(emptyBoard);
  });

  describe("When first move has been made", function() {

    beforeEach(function() {
      ticTacToe.play(1, 22);
    });

    it("one change has happened to the board", function() {
      expect(ticTacToe.board).not.toEqual(emptyBoard);
    });
  });


});
