Resource = require 'core/module/Resource'
canvas = require 'core/module/canvas'
context = canvas.getContext "2d"

input = require 'core/class/Input'

requireSprites = require.context 'game/sprite', true, /^\.\/.*\.(coffee|js)$/
sprites = requireSprites.keys().map requireSprites

requestAnimationFrame = require 'core/module/requestAnimationFrame'

lastTime = do Date.now

step = ->
#    console.log input.isKeyPressed(65)
#    console.log input.isKeyDown(65)

draw = ->
    context.clearRect 0, 0, canvas.width, canvas.height

count = 0

gameLoop = ->
    now = do Date.now
    dt = (now - lastTime) / 1000.0
    fps = 1000.0/(now - lastTime)

    do step
    if (input.keyboard.isUp(65))
        count++
    do draw

    context.fillStyle = "#000"
    context.font = "12pt Arial"
    context.fillText 'fps: '+Math.round(fps), 20, 20
    context.fillText 'count: '+count, 20, 100

    lastTime = now
    requestAnimationFrame gameLoop

init = ->
    canvas.width = 800
    canvas.height = 600
    document.body.appendChild canvas
    do gameLoop

loadImage = ->
    do init
#    arrayUrlImg = []
#    for item of sprites
#        if typeof sprites[item].img == 'string'
#            arrayUrlImg.push('./coffeeMaker/app/images/'+sprites[item].img)
#    resources.load arrayUrlImg
#    resources.onReady init

window.onload = loadImage