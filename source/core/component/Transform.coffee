Component = require 'core/class/Component'
Vector2d = require 'core/class/Vector2d'

class Transform extends Component

  position: new Vector2d 0, 0

  rotate: new Vector2d 1, 0

  scale: new Vector2d 1, 1

module.exports = Transform