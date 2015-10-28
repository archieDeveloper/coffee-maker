(function () {
    var CMRoom = function(opt){
        if (opt == null) { opt = {}; }
        this.width = opt.width || 0;
        this.height = opt.height || 0;
        this.background = opt.background || null;
        this.view = opt.view || null;
        this.objects = opt.objects || null;
    };

    window.CMRoom = CMRoom;
})();