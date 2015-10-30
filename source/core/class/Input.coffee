canvas   = require 'core/module/canvas'
keyboard = require 'core/class/Input/Keyboard'
mouse    = require 'core/class/Input/Mouse'

class Input

  constructor: ->

  keyboard: keyboard

  mouse: mouse

module.exports = new Input
