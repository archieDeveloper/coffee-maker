Component = require 'core/class/Component'
Vector2d = require 'core/class/Vector2d'

class Transform extends Component

  create: (options)->
    {
      @position = new Vector2d
      @scale    = new Vector2d 1, 1
      @rotate   = new Vector2d 1, 0
    } = options
#    if not (@position instanceof Vector2d) or not (@rotate instanceof Vector2d) or not (@scale instanceof Vector2d)
#      throw new TypeError
    @parent.trasform = @

module.exports = Transform