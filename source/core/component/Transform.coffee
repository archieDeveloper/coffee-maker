Component = require 'core/class/Component'
Vector2d = require 'core/class/Vector2d'

class Transform extends Component

  constructor: (options)->
    {
      @position = new Vector2d 0, 0
      @rotate   = new Vector2d 1, 0
      @scale    = new Vector2d 1, 1
    } = options
    isVector2d =
      position: @position instanceof Vector2d
      rotate: @rotate instanceof Vector2d
      scale: @scale instanceof Vector2d
    if not isVector2d.position or not isVector2d.rotate or not isVector2d.rotate
      throw new TypeError

module.exports = Transform