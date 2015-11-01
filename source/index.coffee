Resource = require 'core/class/Resource'
Input = require 'core/class/Input'
Vector2d = require 'core/class/Vector2d'

canvas = require 'core/module/canvas'
context = canvas.getContext "2d"
input = Input.getInstance()
resource = Resource.getInstance()

requireSprites = require.context 'game/sprite', true, /^\.\/.*\.(coffee|js)$/
sprites = requireSprites.keys().map requireSprites

requestAnimationFrame = require 'core/module/requestAnimationFrame'

lastTime = do Date.now

step = ->

draw = ->
  context.clearRect 0, 0, canvas.width, canvas.height

gameLoop = ->
  now = do Date.now
  dt = (now - lastTime) / 1000.0
  fps = 1000.0 / (now - lastTime)

  do step
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
    resource.onReady do init

window.onload = loadImage