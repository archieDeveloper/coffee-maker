Sprite = require 'core/class/Sprite'
Vector2d = require 'core/class/Vector2d'

wheelSprite = new Sprite
  width: 15
  height: 8
  image: 'wheel.png'

do wheelSprite.setOriginCenter

module.exports = wheelSprite