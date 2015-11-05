Vector2d = require 'core/class/Vector2d'

class Entity

  transform:
    position: new Vector2d
    rotate: new Vector2d 1, 0
    scale: new Vector2d 1, 1

  constructor: ->
  create: ->

  step: ->

  draw: ->

module.exports = Entity