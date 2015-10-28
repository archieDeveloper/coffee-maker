(function() {

    var keyPress = {},
        keyDown = {},
        keyUp = {};

    var kkey;

    var mousePress = {},
        mouseDown = {},
        mouseUp = {};

    document.addEventListener('keydown', function(e) {
        e.preventDefault();
        keyPress[e.keyCode] = true;
        keyDown[e.keyCode] = true;

        kkey = e.keyCode;
    });

    document.addEventListener('keyup', function(e) {
        delete keyPress[e.keyCode];
        keyUp[e.keyCode] = true;
    });

    window.addEventListener('blur', function() {
        keyPress = {};
        keyDown = {};
        keyUp = {};
    });

    var isKeyPressed = function (code){
        if (keyPress[code] != null) { return true; }
    };

    var isKeyDown = function (code){
        if (keyDown[code] != null) { return true; }
    };

    var isKeyUp = function (code){
        if (keyUp[code] != null) { return true; }
    };

    var whatKey = function (){
        console.log(kkey);
    };

    canvas.addEventListener('mousemove', function(e) {
        window.mouseX = e.offsetX==undefined?e.layerX:e.offsetX;
        window.mouseY = e.offsetY==undefined?e.layerY:e.offsetY;
    });

    canvas.addEventListener('mousedown', function(e) {
        mousePress[e.which] = true;
        mouseDown[e.which] = true;
    });

    canvas.addEventListener('mouseup', function(e) {
        delete mousePress[e.which];
        mouseUp[e.which] = true;
    });

    canvas.oncontextmenu = function(e) { return false; };

    var isMousePressed = function (code){
        if (mousePress[code] != null) { return true; }
    };

    var isMouseDown = function (code){
        if (mouseDown[code] != null) { return true; }
    };

    var isMouseUp = function (code){
        if (mouseUp[code] != null) { return true; }
    };

    var setMyCursor = function(sprite){
        if (canvas.style.cursor !== 'none') {
            canvas.style.cursor = 'none';
        }
        drawSprite(sprite, mouseX, mouseY);
    };

    var clearEvent = function(){
        mouseDown = {};
        mouseUp = {};
        keyDown = {};
        keyUp = {};
    }

    window.isKeyPressed = isKeyPressed;
    window.isKeyDown = isKeyDown;
    window.isKeyUp = isKeyUp;

    window.whatKey = whatKey;

    window.mouseX = 0;
    window.mouseY = 0;
    window.isMousePressed = isMousePressed;
    window.isMouseDown = isMouseDown;
    window.isMouseUp = isMouseUp;
    window.setMyCursor = setMyCursor;

    window.clearEvent = clearEvent;
})();