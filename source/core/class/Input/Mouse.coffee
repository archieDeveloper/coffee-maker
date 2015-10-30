canvas = require 'core/module/canvas'

mousePress = {}
mouseDown  = {}
mouseUp    = {}

class Mouse

  constructor: ->
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

  isPressed: (code)->
    mousePress[code]?

  isDown: (code)->
    mouseDown[code]?

  isUp: (code)->
    mouseUp[code]?

module.exports = new Mouse