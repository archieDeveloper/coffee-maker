Resource = require './core/engine/module/Resource'

Input = require './core/engine/class/Input'

requireSprites = require.context './game/sprite', true, /^\.\/.*\.(coffee|js)$/
sprites = requireSprites.keys().map requireSprites

requestAnimationFrame = require './core/engine/module/requestAnimationFrame'

canvas = document.createElement "canvas"
context = canvas.getContext "2d"
lastTime = do Date.now

step = ->

draw = ->
    context.clearRect 0, 0, canvas.width, canvas.height

gameLoop = ->
    now = do Date.now
    dt = (now - lastTime) / 1000.0
    fps = 1000.0/(now - lastTime)

    do step
    #    do clearEvent
    do draw

    context.fillStyle = "#000"
    context.font = "12pt Arial"
    context.fillText 'fps: '+Math.round(fps), 20, 20

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