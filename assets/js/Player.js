var Player = function () {

    var getPlayerShape = function (player) {
        if (player === 1) {
            return 'x';
        } else {
            return 'o';
        }
    }

    var getPlayerFromShape = function (player) {
        if (player === 'x') {
            return 1;
        } else {
            return 2;
        }
    }

    var getPlayerOponent = function (player) {
        if (player === 1) {
            return 2;
        } else {
            return 1;
        }
    }


    return {
        getPlayerFromShape: getPlayerFromShape,
        getPlayerShape: getPlayerShape,
        getPlayerOponent: getPlayerOponent,
    }
};
