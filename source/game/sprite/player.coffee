Sprite = require 'core/class/Sprite'
Vector2d = require 'core/class/Vector2d'

playerSprite = new Sprite
  width: 10
  height: 10

playerSprite.setOriginCenter()

module.exports = playerSprite