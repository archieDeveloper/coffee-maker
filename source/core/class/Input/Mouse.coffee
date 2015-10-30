canvas = require 'core/module/canvas'

class Mouse

  mousePress = {}
  mouseDown  = {}
  mouseUp    = {}

  position   = x:0, y:0

  instance = null

  constructor: ->
    canvas.addEventListener 'mousemove', (e)->
      position.x = if not e.offsetX? then e.layerX else e.offsetX
      position.y = if not e.offsetY? then e.layerY else e.offsetY
    canvas.addEventListener 'mouseDown', (e)->
      mousePress[e.which] = true
      mouseDown[e.which] = true
    canvas.addEventListener 'mouseUp', (e)->
      delete mousePress[e.which]
      mouseUp[e.which] = true
    canvas.oncontextmenu = ()->
      false

  @getInstance: ->
    if not instance?
      instance = new Mouse
    instance

  isPressed: (code)->
    mousePress[code]?

  isDown: (code)->
    mouseDown[code]?

  isUp: (code)->
    mouseUp[code]?

  getPosition: ->
    position


module.exports = Mouse