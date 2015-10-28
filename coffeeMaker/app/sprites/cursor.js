(function () {

    var cursor = {
        img: 'cursor.png',
        height: 15,
        width: 11,
        originX: 0,
        originY: 0
    }

    if (window.sprites == null) {
        window.sprites = {};
    }

    window.sprites.cursor = cursor;

})();