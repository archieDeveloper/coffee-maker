Keyboard = require 'core/class/Input/Keyboard'
Mouse    = require 'core/class/Input/Mouse'

class Input

  instance = null

  constructor: ->

  @getInstance: ->
    if not instance?
      instance = new Input
    instance

  keyboard: Keyboard.getInstance()

  mouse: Mouse.getInstance()

module.exports = Input
