(function () {

    var box = {
        create: function () {
            this.mask = s.box;
        },
        step: function() {

        },
        draw: function() {
            drawSpriteExt(s.box, this.x, this.y,1,1,0,1);
        },
        destroy: function() {
        }
    }

    if (window.objects == null) {
        window.objects = {};
    }
    window.objects.box = box;

})();