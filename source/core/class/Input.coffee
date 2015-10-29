canvas = require 'core/module/canvas'

keyPress = {}
keyDown = {}
keyUp = {}
mousePress = {}
mouseDown = {}
mouseUp = {}

resetAllKeys = ->
  keyPress = {}
  keyDown = {}
  keyUp = {}

resetUpKey = (keyCode)->
  delete keyUp[keyCode]

resetDownKey = (keyCode)->
  delete keyDown[keyCode]

resetPressKey = (keyCode)->
  delete keyPress[keyCode]

onDownKey = (keyCode)->
  if not keyDown[keyCode]?
    keyDown[keyCode] = true

onUpKey = (keyCode)->
  if not keyUp[keyCode]?
    keyUp[keyCode] = true

onPressKey = (keyCode)->
  keyPress[keyCode] = true

class Input

  constructor: ->
    window.document.addEventListener 'keydown', (e)->
      console.log('keydown')
      do e.preventDefault
      resetUpKey e.keyCode
      onPressKey e.keyCode
      onDownKey e.keyCode
    window.document.addEventListener 'keyup', (e)->
      resetPressKey e.keyCode
      resetDownKey e.keyCode
      onUpKey e.keyCode
    window.addEventListener 'blur', ->
      do resetAllKeys
    canvas.addEventListener 'mousemove', (e)->
      window.mouseX = if e.offsetX == undefined then e.layerX else e.offsetX
      window.mouseY = if e.offsetY == undefined then e.layerY else e.offsetY
    canvas.addEventListener 'mouseDown', (e)->
      mousePress[e.which] = true
      mouseDown[e.which] = true
    canvas.addEventListener 'mouseUp', (e)->
      delete mousePress[e.which]
      mouseUp[e.which] = true
    canvas.oncontextmenu = ()->
      false

  isKeyPressed: (code)->
    keyPress[code]?

  isKeyDown: (code)->
    if keyDown[code]? and keyDown[code] is true
      keyDown[code] = 2
      true
    else
      false

  isKeyUp: (code)->
    if keyUp[code]? and keyUp[code] is true
      keyUp[code] = 2
      true
    else
      false

  isMousePressed: (code)->
    mousePress[code]?

  isMouseDown: (code)->
    mouseDown[code]?

  isMouseUp: (code)->
    mouseUp[code]?

# setMyCursor = (sprite)->
#     if canvas.style.cursor != 'none'
#         canvas.style.cursor = 'none'
#     drawSprite sprite, mouseX, mouseY
#     return

module.exports = new Input
