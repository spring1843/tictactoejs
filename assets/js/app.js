(function (angular) {
    'use strict';
    angular.module('ticTacToe', [])
        .controller('MainController', ['$scope', MainController]);

    function MainController($scope) {


        $scope.ticTacToe = null;
        $scope.player1 = null;
        $scope.player2 = null;
        $scope.gameStatus = null;
        $scope.board = null;

        $scope.init = function () {
            $scope.ticTacToe = new TicTacToe();
            $scope.player1 = new Player($scope.ticTacToe, 1);
            $scope.player2 = new Player($scope.ticTacToe, 2);
            $scope.gameStatus = $scope.ticTacToe.getGameStatus();
            $scope.board = $scope.ticTacToe.getBoard();
        }

        $scope.getCellShape = function (boardCell) {
            if (boardCell === null)
                return '+';
            else
                return boardCell;
        }

        $scope.playAgain = function () {
            $scope.init();
        }

        $scope.refreshStatus = function () {
            var gameStatus = $scope.ticTacToe.getGameStatus();
            $scope.gameStatus = gameStatus;
            return gameStatus;
        }

        var canPlayerPlay = function (boardCell) {
            if ($scope.gameStatus.isGameOver === true)
                return false;

            if ($scope.board[boardCell[0] - 1][boardCell[1] - 1] != null)
                return false;

            return true;
        }

        $scope.playForUser = function (boardCell) {
            if (canPlayerPlay(boardCell) === false)
                return;

            $scope.player1.play(boardCell[0], boardCell[1]);
            $scope.refreshStatus();

            if ($scope.refreshStatus().isGameOver === false)
                $scope.player2.autoPlay();

            $scope.board = $scope.ticTacToe.getBoard();
            $scope.refreshStatus();
        }

        $scope.init();
    }


})(window.angular);

(function ($) {
    $.backstretch("assets/img/bg.jpg");
})(window.$);

