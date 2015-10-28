(function () {

    var box = {
        img: 'box.png',
        height: 32,
        width: 32,
        originX: 'center',
        originY: 'center'
    }

    if (window.sprites == null) {
        window.sprites = {};
    }

    window.sprites.box = box;

})();