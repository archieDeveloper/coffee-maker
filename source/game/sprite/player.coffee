Sprite = require 'core/component/Sprite'
Vector2d = require 'core/class/Vector2d'

playerSprite = new Sprite
  width: 77
  height: 32
  image: 'player.png'

do playerSprite.setOriginCenter

module.exports = playerSprite