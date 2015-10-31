Vector2d = require 'core/class/Vector2d'

class Sprite

  constructor: (opt)->
    if not (opt? and opt.origin? and opt.origin instanceof Vector2d)
      throw new Error('Не правильный тип')
    {
      @width = 0
      @height = 0
      @origin = new Vector2d 0, 0
      @image = null
    } = opt

module.exports = Sprite