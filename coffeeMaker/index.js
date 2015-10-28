(function () {

    window.object = {};
    window.sprite = {};

    var canvas,
        ctx,
        lastTime,
        importJs,
        loadImage,
        initSprites,
        init,
        loop,
        step,
        draw,
        requestAnimFrame;

    requestAnimFrame = (function(){
        return window.requestAnimationFrame    ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    canvas = document.createElement("canvas");
    window.canvas = canvas;

    /* импортирует js файлы */
    importJs = function (src, callback) {
        var script = document.createElement('script');
        script.src = './coffeeMaker/'+src+'.js';
        var newScript = document.getElementsByTagName('head')[0].appendChild(script);
        newScript.onload = callback;
    };

    importJs('core/lib/include', function(){
        for (var i = 0, coreIncLength = coreInclude.length - 1; i <= coreIncLength; i++) {
            importJs('core/'+coreInclude[i]);
        }
    });
    
    importJs('app/config/include', function(){
        for (var i = 0,incLength = include.length - 1; i <= incLength; i++) {
            importJs('app/'+include[i]);
        }
    });

    loadImage = function(){
        var arrayUrlImg = [];
        for (var item in sprites) {
          if(typeof sprites[item].img === 'string'){
            arrayUrlImg.push('./coffeeMaker/app/images/'+sprites[item].img);
          }
        }
        for (var first_room in rooms) {
          if(typeof rooms[first_room].background === 'string'){
            arrayUrlImg.push('./coffeeMaker/app/images/'+rooms[first_room].background);
          }
        }
        resources.load(arrayUrlImg);
        resources.onReady(init);
    };

    initSprites = function(){

        for (var item in sprites) {
            if (typeof sprites[item].img === "string") {
                sprites[item].img = resources.get('./coffeeMaker/app/images/'+sprites[item].img);
            }
            if (typeof sprites[item].originX === "string" && sprites[item].originX === 'center') {
                sprites[item].originX = sprites[item].width/2;
            }
            if (typeof sprites[item].originY === "string" && sprites[item].originY === 'center') {
                sprites[item].originY = sprites[item].height/2;
            }
            sprite[item] = new CMSprite(sprites[item]);
        }

        for (var first_room in rooms) {
            if (typeof rooms[first_room].background === "string") {
                rooms[first_room].background = resources.get('./coffeeMaker/app/images/'+rooms[first_room].background);
            }
            room = new CMRoom(rooms[first_room]);
            window.room = room;
            break;
        }

        for (var item in sprites) {
            if (typeof sprites[item].img === "string") {
                sprites[item].img = resources.get('./coffeeMaker/app/images/'+sprites[item].img);
            }
            if (typeof sprites[item].originX === "string" && sprites[item].originX === 'center') {
                sprites[item].originX = sprites[item].width/2;
            }
            if (typeof sprites[item].originY === "string" && sprites[item].originY === 'center') {
                sprites[item].originY = sprites[item].height/2;
            }
            sprite[item] = new CMSprite(sprites[item]);
        }
    };

    init = function (){

        initSprites();

        ctx = canvas.getContext("2d");
        canvas.width = setting.windowWidth;
        canvas.height = setting.windowHeight;
        document.body.appendChild(canvas);

        window.ctx = ctx;

        for (var i = 0, roomObjectsLen = room.objects.length - 1; i <= roomObjectsLen; i++) {
            instanceCreate(room.objects[i][0],room.objects[i][1],room.objects[i][2]);
        }

        lastTime = Date.now();
        loop();
    };

    loop = function() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0,
            fps = 1000.0 /(now - lastTime);

        step();
        clearEvent();
        draw();

        ctx.fillStyle = "#000";
        ctx.font = "12pt Arial";
        ctx.fillText('fps: '+Math.round(fps), 20, 20);

        lastTime = now;
        requestAnimFrame(loop);
    };

    step = function(){
        for (var collection in object) {
            for (var item in object[collection].id) {
                object[collection].id[item].step();
            }
        }
        for (var i = 0, roomViewLen = room.view.length; i < roomViewLen; i++) {
            if (room.view[i].x <= 0) { room.view[i].x = 0; }
            if (room.view[i].y <= 0) { room.view[i].y = 0; }
            if ((room.view[i].x+room.view[i].width) >= room.width) {
                room.view[i].x = room.width-room.view[i].width;
            }
            if ((room.view[i].y+room.view[i].height) >= room.height) {
                room.view[i].y = room.height-room.view[i].height;
            }
        }
    };

    draw = function(){
        var ws, wf, hs, hf;
        ctx.clearRect (0, 0, canvas.width, canvas.height);

        for (var i = 0, roomViewLen = room.view.length; i < roomViewLen; i++) {

            if (room.background != null) {
                ws = Math.floor(room.view[i].x/room.background.width);
                wf = Math.ceil((room.view[i].x+room.view[i].width)/room.background.width);

                hs = Math.floor(room.view[i].y/room.background.height);
                hf = Math.ceil((room.view[i].y+room.view[i].height)/room.background.height);

                for (var h = hs; h < hf; h++) {
                    for (var w = ws; w < wf; w++) {

                        var x = room.background.width*w,
                            y = room.background.height*h;

                        ctx.save();

                        ctx.beginPath();
                        ctx.rect(
                            room.view[i].offset.x,
                            room.view[i].offset.y,
                            room.view[i].width,
                            room.view[i].height
                            );
                        ctx.clip();

                        ctx.drawImage(
                            room.background,
                            x-room.view[i].x+room.view[i].offset.x,
                            y-room.view[i].y+room.view[i].offset.y,
                            room.background.width,
                            room.background.height
                            );

                        ctx.restore();
                    }
                }
            }

            for (var collection in object) {
                for (var item in object[collection].id) {
                    object[collection].id[item].draw();
                }
            }

            setMyCursor(s.cursor);
        }
    };

    window.onload = loadImage;
})();