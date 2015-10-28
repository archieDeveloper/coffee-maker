(function () {
    var instanceCreate = function(nameObject,x,y){
        if (object[nameObject] == null) {
            object[nameObject] = new CMCollectionObjects();
        }
        var newObject = new CMObject(objects[nameObject]);
        object[nameObject].add(newObject, function(newObjectId){
            if (x != null) {
                object[nameObject].id[newObjectId].x = x;
            }
            if (y != null) {
                object[nameObject].id[newObjectId].y = y;
            }
            object[nameObject].id[newObjectId].create();
        });
        return newObject;
    };

    var instanceDestroy = function(obj){
        obj.destroy();
        for (var collection in object) {
            for (var item in object[collection].id) {
                if (obj === object[collection].id[item]) {
                    delete object[collection].id[item];
                }
            }
        }
    };

    var force = function(f,dir){
        var speedX = Math.cos(dir/180*Math.PI)*f;
        var speedY = Math.sin(dir/180*Math.PI)*f;
        return new CMVector2d(speedX,speedY);
    };

    var lengthdirX = function(len, dir){
        return Math.cos(dir*Math.PI/180)*len;
    };

    var lengthdirY = function(len, dir){
        return Math.sin(dir*Math.PI/180)*len;
    };

    var inscribedInRectangle = function(spr, x, y, dir){
        var rx1 = x-lengthdirX(spr.originX, dir)-lengthdirX(spr.originY, dir+90);
        var ry1 = y-lengthdirY(spr.originX, dir)-lengthdirY(spr.originY, dir+90);

        var rx2 = x-lengthdirX(spr.originX, dir)+lengthdirX(spr.originY, dir+90);
        var ry2 = y-lengthdirY(spr.originX, dir)+lengthdirY(spr.originY, dir+90);

        var rx3 = x+lengthdirX(spr.width - spr.originX, dir)-lengthdirX(spr.originY, dir+90);
        var ry3 = y+lengthdirY(spr.width - spr.originX, dir)-lengthdirY(spr.originY, dir+90);

        var rx4 = x+lengthdirX(spr.width - spr.originX, dir)+lengthdirX(spr.originY, dir+90);
        var ry4 = y+lengthdirY(spr.width - spr.originX, dir)+lengthdirY(spr.originY, dir+90);

        var minX = Math.min(rx1, rx2, rx3, rx4);
        var maxX = Math.max(rx1, rx2, rx3, rx4);

        var minY = Math.min(ry1, ry2, ry3, ry4);
        var maxY = Math.max(ry1, ry2, ry3, ry4);

        return [minX,minY,maxX-minX,maxY-minY];
    };

    var collisionPoint = function(obj, x, y){
        if (object[obj] != null) {
            for (var i = 0; i < object[obj].id.length; i++) {
                if (object[obj].id[i] != null) {
                    var objMinX = object[obj].id[i].x - object[obj].id[i].mask.originX;
                    var objMaxX = objMinX + object[obj].id[i].mask.width;

                    var objMinY = object[obj].id[i].y - object[obj].id[i].mask.originY;
                    var objMaxY = objMinY + object[obj].id[i].mask.height;
                    if (((x > objMinX) && (x < objMaxX)) && ((y > objMinY) && (y < objMaxY))) {
                        return object[obj].id[i];
                    }
                }
            }
        }
        return null;
    };

    window.instanceCreate = instanceCreate;
    window.instanceDestroy = instanceDestroy;

    window.inscribedInRectangle = inscribedInRectangle;
    window.collisionPoint = collisionPoint;

    window.force = force;
    window.lengthdirX = lengthdirX;
    window.lengthdirY = lengthdirY;
})();