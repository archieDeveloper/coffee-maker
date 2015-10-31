canvas = require 'core/module/canvas'
Vector2d = require 'core/class/Vector2d'

class Mouse

  mousePress = {}
  mouseDown  = {}
  mouseUp    = {}

  instance   = null

  position: new Vector2d 0, 0

  constructor: ->
    canvas.addEventListener 'mousemove', (e)=>
      @position.x = if not e.offsetX? then e.layerX else e.offsetX
      @position.y = if not e.offsetY? then e.layerY else e.offsetY
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

module.exports = Mouse