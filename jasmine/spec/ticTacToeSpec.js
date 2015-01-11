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
      var changedBoard = [
        [ 'x', null, null ],
        [ null, null, null ],
        [ null, null, null ]
      ];
      expect(ticTacToe.board).toEqual(changedBoard);
    });

    it("Game should not be over after the first game", function() {
      expect(ticTacToe.getGameStatus().isGameOver).toBeFalsy();
      expect(ticTacToe.getGameStatus().gameResult).toEqual(null);
    });

    it("Game should not have a winner after the first game", function() {
      expect(ticTacToe.getGameStatus().winner).toEqual(null);
    });
  });

  describe("When a player wins", function() {
    beforeEach(function() {
      ticTacToe = new TicTacToe();
    });

    it("Game is over with Horizontal l win", function() {
      ticTacToe.play(1, [1,1]);
      ticTacToe.play(2, [2,1]);
      ticTacToe.play(1, [1,2]);
      ticTacToe.play(2, [2,2]);
      ticTacToe.play(1, [1,3]);
      expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
      expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
    });

    it("Game is over with Horizontal 2 win", function() {
      ticTacToe.play(1, [2,1]);
      ticTacToe.play(2, [3,1]);
      ticTacToe.play(1, [2,2]);
      ticTacToe.play(2, [3,2]);
      ticTacToe.play(1, [2,3]);
      expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
      expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
    });

    it("Game is over with Horizontal 3 win", function() {
      ticTacToe.play(1, [3,1]);
      ticTacToe.play(2, [2,1]);
      ticTacToe.play(1, [3,2]);
      ticTacToe.play(2, [2,2]);
      ticTacToe.play(1, [3,3]);
      expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
      expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
    });

    it("Game is over with a Vertical 1 win", function() {
      ticTacToe.play(1, [1,1]);
      ticTacToe.play(2, [2,2]);
      ticTacToe.play(1, [2,1]);
      ticTacToe.play(2, [3,3]);
      ticTacToe.play(1, [3,1]);
      expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
      expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
    });

    it("Game is over with a Vertical 2 win", function() {
      ticTacToe.play(1, [1,2]);
      ticTacToe.play(2, [2,3]);
      ticTacToe.play(1, [2,2]);
      ticTacToe.play(2, [3,3]);
      ticTacToe.play(1, [3,2]);
      expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
      expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
    });

    it("Game is over with a Vertical 3 win", function() {
      ticTacToe.play(1, [1,3]);
      ticTacToe.play(2, [2,2]);
      ticTacToe.play(1, [2,3]);
      ticTacToe.play(2, [3,3]);
      ticTacToe.play(1, [3,3]);
      expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
      expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
    });

    it("Game is over with a Diagonal 1 win", function() {
      ticTacToe.play(1, [1,1]);
      ticTacToe.play(2, [2,1]);
      ticTacToe.play(1, [2,2]);
      ticTacToe.play(2, [3,1]);
      ticTacToe.play(1, [3,3]);
      expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
      expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
    });

    it("Game is over with a Diagonal 2 win", function() {
      ticTacToe.play(1, [1,3]);
      ticTacToe.play(2, [2,1]);
      ticTacToe.play(1, [2,2]);
      ticTacToe.play(2, [3,2]);
      ticTacToe.play(1, [3,1]);
      expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
      expect(ticTacToe.getGameStatus().gameResult).toEqual('win');
    });

    it("Game can not be played anymore", function() {
      ticTacToe.play(1, [1,1]);
      ticTacToe.play(2, [2,1]);
      ticTacToe.play(1, [1,2]);
      ticTacToe.play(2, [2,2]);
      ticTacToe.play(1, [1,3]);
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
      expect(ticTacToe.getGameStatus().winner).not.toEqual(null);
    });
  });


  describe("When there is a draw", function() {
    beforeEach(function() {
      ticTacToe = new TicTacToe();
    });

    it("Game is over with a draw", function() {
      ticTacToe.play(1, [1,1]);
      ticTacToe.play(2, [1,2]);
      ticTacToe.play(1, [1,3]);
      ticTacToe.play(2, [2,2]);
      ticTacToe.play(1, [3,2]);
      ticTacToe.play(2, [2,3]);
      ticTacToe.play(1, [2,1]);
      ticTacToe.play(2, [3,1]);
      ticTacToe.play(1, [3,3]);
      expect(ticTacToe.getGameStatus().isGameOver).toBeTruthy();
      expect(ticTacToe.getGameStatus().gameResult).toEqual('draw');
    });

    it("Game can not be played anymore", function() {
      ticTacToe.play(1, [1,1]);
      ticTacToe.play(2, [1,2]);
      ticTacToe.play(1, [1,3]);
      ticTacToe.play(2, [2,2]);
      ticTacToe.play(1, [3,2]);
      ticTacToe.play(2, [2,3]);
      ticTacToe.play(1, [2,1]);
      ticTacToe.play(2, [3,1]);
      ticTacToe.play(1, [3,3]);
      expect( function(){
        ticTacToe.play(1, [1,1]);
      }).toThrow(
          new Error("Playing is not possible, game is over")
      );
    });

    it("There's no winner", function() {
      ticTacToe.play(1, [1,1]);
      ticTacToe.play(2, [1,2]);
      ticTacToe.play(1, [1,3]);
      ticTacToe.play(2, [2,2]);
      ticTacToe.play(1, [3,2]);
      ticTacToe.play(2, [2,3]);
      ticTacToe.play(1, [2,1]);
      ticTacToe.play(2, [3,1]);
      ticTacToe.play(1, [3,3]);
      expect(ticTacToe.getGameStatus().winner).toEqual(null);
    });
  });

});