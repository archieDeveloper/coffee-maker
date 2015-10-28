(function () {
    var CMObject = function(opt){
        if (opt == null) { opt = {}; }
        for(var name in opt){
            this[name] = opt[name];
        }

        if (typeof this.create !== 'function') { this.create = function(){}; }
        if (typeof this.click !== 'function') { this.click = function(){}; }
        if (typeof this.step !== 'function') { this.step = function(){}; }
        if (typeof this.draw !== 'function') { this.draw = function(){}; }
        if (typeof this.destroy !== 'function') { this.destroy = function(){}; }
    };

    window.CMObject = CMObject;
})();