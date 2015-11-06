Sprite = require 'core/class/Sprite'
Vector2d = require 'core/class/Vector2d'

rudderSprite = new Sprite
  width: 400
  height: 400
  image: 'rudder.png'

do rudderSprite.setOriginCenter

module.exports = rudderSprite