(function () {

    var level1 = {
        width: 1000,
        height: 1000,
        background: 'bg1.png',
        view: [
            {
                width: 30*32,
                height: 19*32,
                x: 0,
                y: 0,
                offset: {
                    x: 0,
                    y: 0
                }
            }
        ],
        objects: [
            ['control']
        ]
    }

    if (window.rooms == null) {
        window.rooms = {};
    }

    window.rooms.level1 = level1;

})();