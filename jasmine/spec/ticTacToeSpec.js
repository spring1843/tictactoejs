describe("TicTacToe", function() {
  var ticTacToe;

  beforeEach(function() {
    ticTacToe = new TicTacToe();
    emptyBoard = [ [ null, null, null ], [ null, null, null ], [ null, null, null ] ] ;
  });

  it("Should have an empty board in a new game", function() {
    expect(ticTacToe.board).toEqual(emptyBoard);
  });

  it("Game should not be over in a new game", function() {
    expect(ticTacToe.isGameOver).toBeFalsy();
  });

  describe("When first move has been made", function() {
    beforeEach(function() {
      ticTacToe.play(1, [1,1]);
    });

    it("one change has happened to the board", function() {
      changedBoard = [ [ 'x', null, null ], [ null, null, null ], [ null, null, null ] ] ;
      expect(ticTacToe.board).toEqual(changedBoard);
    });

    it("Game should not be over after the first game", function() {
      expect(ticTacToe.isGameOver).toBeFalsy();
    });

    it("Game should not have a winner after the first game", function() {
      expect(ticTacToe.getWinner()).toEqual(null);
    });
  });

  describe("When a player wins", function() {
    beforeEach(function() {
      ticTacToe = new TicTacToe();
    });

    it("Game is over with Horizontal win", function() {
      ticTacToe.play(1, [1,1]);
      ticTacToe.play(2, [2,1]);
      ticTacToe.play(1, [1,3]);
      ticTacToe.play(2, [2,2]);
      ticTacToe.play(1, [1,2]);
      expect(ticTacToe.getIsGameOver()).toBeTruthy();
    });

    it("Game can not be played anymore", function() {
      ticTacToe.play(1, [1,1]);
      ticTacToe.play(2, [2,1]);
      ticTacToe.play(1, [1,3]);
      ticTacToe.play(2, [2,2]);
      ticTacToe.play(1, [1,2]);
      expect( function(){ 
        ticTacToe.play(1, [1,1]);
      }).toThrow(
        new Error("Playing is not possible, game is over")
      );
    });

    it("There's a winner", function() {
      ticTacToe.play(1, [1,1]);
      ticTacToe.play(2, [2,1]);
      ticTacToe.play(1, [1,3]);
      ticTacToe.play(2, [2,2]);
      ticTacToe.play(1, [1,2]);
      expect(ticTacToe.getWinner()).not.toEqual(null);
    });
  });

});