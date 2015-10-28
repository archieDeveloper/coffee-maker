(function () {
    var CMCollectionObjects = function(nameObject){
        this.id;
    };

    CMCollectionObjects.prototype = {
        add: function(object, callback){
            if (this.id == null) {
                this.id = new Array();
            };
            var newId = this.id.push(object) - 1;
            callback(newId);
        }
    };
    window.CMCollectionObjects = CMCollectionObjects;
})();