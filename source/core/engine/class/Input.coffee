keyPress = {}
keyDown = {}
keyUp = {}

kkey = undefined

mousePress = {}
mouseDown = {}
mouseUp = {}

document.addEventListener 'keydown', (e)->
    do e.preventDefault
    keyPress[e.keyCode] = true
    keyDown[e.keyCode] = true
    kkey = e.keyCode
    return

document.addEventListener 'keyup', (e)->
    delete keyPress[e.keyCode]
    keyUp[e.keyCode] = true
    return

window.addEventListener 'blur', ->
    keyPress = {}
    keyDown = {}
    keyUp = {}
    return

isKeyPressed = (code)->
    if keyPress[code] != null
        true

isKeyDown = (code)->
    if keyDown[code] != null
        true

isKeyUp = (code)->
    if keyUp[code] != null
        true

whatKey = ()->
    console.log kkey
    return

canvas.addEventListener 'mousemove', (e)->
    window.mouseX = if e.offsetX == undefined then e.layerX else e.offsetX
    window.mouseY = if e.offsetY == undefined then e.layerY else e.offsetY
    return

canvas.addEventListener 'mousedown', (e)->
    mousePress[e.which] = true
    mouseDown[e.which] = true
    return

canvas.addEventListener 'mouseup', (e)->
    delete mousePress[e.which]
    mouseUp[e.which] = true
    return

canvas.oncontextmenu = (e)->
    false

isMousePressed = (code)->
    if mousePress[code] != null
        true

isMouseDown = (code)->
    if mouseDown[code] != null
        true

isMouseUp = (code)->
    if mouseUp[code] != null
        true

setMyCursor = (sprite)->
    if canvas.style.cursor != 'none'
        canvas.style.cursor = 'none'
    drawSprite sprite, mouseX, mouseY
    return

clearEvent = ->
    mouseDown = {}
    mouseUp = {}
    keyDown = {}
    keyUp = {}
    return
