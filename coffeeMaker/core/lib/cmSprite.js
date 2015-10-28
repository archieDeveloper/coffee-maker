(function () {
    var CMSprite = function(opt){
        if (opt == null) { opt = {}; }
        this.width = opt.width || 0;
        this.height = opt.height || 0;
        this.originX = opt.originX || 0;
        this.originY = opt.originY || 0;
        this.img = opt.img || null;
    };

    window.CMSprite = CMSprite;
})();