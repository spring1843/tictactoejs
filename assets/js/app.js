(function (angular) {
    'use strict';
    angular.module('ticTacToe', [])
        .controller('MainController', ['$scope', MainController]);

    function MainController($scope) {
        $scope.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];

        $scope.getCellShape = function(boardCell){
            if(boardCell === null)
                return '+';
            else
                return boardCell;
        }

    }


})(window.angular);

(function ($) {
    $.backstretch("assets/img/bg.jpg");
})(window.$);

