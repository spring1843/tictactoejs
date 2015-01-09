var TicTacToe = function () {
    // defined within the local scope
    var privateMethod1 = function () { /* ... */ }
    var privateMethod2 = function () { /* ... */ }

    var EMPTY = null;

    var board = [
    	[null,null,null],
    	[null,null,null],
    	[null,null,null],
    ];


    return {
        // the object literal returned here can have as many
        // nested depths as you wish, however as mentioned,
        // this way of doing things works best for smaller,
        // limited-scope applications in my personal opinion
        publicMethod1: privateMethod1,
        //nested namespace with public properties
        board : board,
        utils:{
            publicMethod2: privateMethod2
        }
    }
};