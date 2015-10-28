(function () {
    var drawSprite = function(sprite, x, y){
        if (!(sprite instanceof CMSprite)) {console.log('ошибка: не правильный тип аргумента sprite');return;}
        
        ctx.save();
        ctx.drawImage(
            sprite.img,
            x-sprite.originX,
            y-sprite.originY,
            sprite.width,
            sprite.height
            );
        ctx.restore();
    };

    var drawText = function(text, x, y){
        ctx.save();
        ctx.fillStyle = "#000";
        ctx.font = "12pt Arial";
        ctx.fillText(text, x, y);
        ctx.restore();
    };

    var drawSpriteExt = function(sprite,x,y,xscale,yscale,rot,alpha){
        for (var i = 0; i < room.view.length; i++) {
            var XYWH = inscribedInRectangle(sprite, x, y, rot);

            var bgX = XYWH[0]-room.view[i].x+room.view[i].offset.x,
                bgY = XYWH[1]-room.view[i].y+room.view[i].offset.y,
                bgW = XYWH[2],
                bgH = XYWH[3];

            var roomX = room.view[i].offset.x,
                roomY = room.view[i].offset.y,
                roomW = room.view[i].width,
                roomH = room.view[i].height;

            if (((bgX+bgW > roomX) && (bgX < roomX+roomW)) && ((bgY+bgH > roomY) && (bgY < roomY+roomH))) {
                ctx.save();

                ctx.beginPath();
                ctx.rect(
                    room.view[i].offset.x,
                    room.view[i].offset.y,
                    room.view[i].width,
                    room.view[i].height
                    );
                ctx.clip();

                ctx.translate(x-room.view[i].x+room.view[i].offset.x, y-room.view[i].y+room.view[i].offset.y);
                ctx.rotate(rot * Math.PI / 180);
                //ctx.setAlpha(alpha);
                ctx.drawImage(
                    sprite.img,
                    0,
                    0,
                    sprite.width,
                    sprite.height,
                    -sprite.originX*xscale,
                    -sprite.originY*yscale,
                    sprite.width*xscale,
                    sprite.height*yscale
                    );
                ctx.restore();
            }
        }
    };

    window.drawSprite = drawSprite;
    window.drawSpriteExt = drawSpriteExt;
    window.drawText = drawText;
})();