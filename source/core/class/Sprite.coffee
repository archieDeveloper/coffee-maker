Vector2d = require 'core/class/Vector2d'

class Sprite

  constructor: (options)->
    {
      @width = 0
      @height = 0
      @origin = new Vector2d
      @image = null
    } = options
    if not (@origin instanceof Vector2d)
      throw new Error 'No valid type'

  setOriginCenter: ->
    do @setOriginHorizontalCenter
    do @setOriginVerticalCenter

  setOriginVerticalCenter: ->
    @origin.y = @height/2

  setOriginHorizontalCenter: ->
    @origin.x = @width/2

module.exports = Sprite