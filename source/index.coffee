Entity = require 'core/class/Entity'
mainScene = require 'game/scene/main'
e1 = new Entity
e2 = new Entity
e3 = new Entity
e4 = new Entity

#console.log [mainScene]
###

Resource = require 'core/class/Resource'
Input = require 'core/class/Input'
Vector2d = require 'core/class/Vector2d'

canvas = require 'core/module/canvas'
context = canvas.getContext "2d"
input = Input.getInstance()

resource = Resource.getInstance()

# requireSprites = require.context 'game/sprite', true, /^\.\/.*\.(coffee|js)$/
# sprites = requireSprites.keys().map requireSprites

mainScene = require 'game/scene/main'
# requireScenes = require.context 'game/scene', true, /^\.\/.*\.(coffee|js)$/
# scenes = requireScenes.keys().map requireScenes

console.log mainScene

requestAnimationFrame = require 'core/module/requestAnimationFrame'

lastTime = do Date.now

step = ->
  for name, object of currentScene['object']
    do object['step']
draw = ->
  context.clearRect 0, 0, canvas.width, canvas.height
  for name, object of currentScene['object']
    do object['draw']

gameLoop = ->
  now = do Date.now
  dt = (now - lastTime) / 1000.0
  fps = 1000.0 / (now - lastTime)

#  console.log(input.keyboard.isDown(87))

#  do step
#  do draw

  context.fillStyle = "#000"
  context.font = "12pt Arial"
  context.fillText 'fps: '+Math.round(fps), 20, 20

  lastTime = now
  requestAnimationFrame gameLoop

init = ->
  canvas.width = 800
  canvas.height = 600
  document.body.appendChild canvas

  cc = require('core/class/Component')
  console.log(new cc)
#  do gameLoop

loadImage = ->
    resource.onReady do init

window.onload = loadImage


###