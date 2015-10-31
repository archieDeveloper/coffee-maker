Sprite = require 'core/class/Sprite'
Vector2d = require 'core/class/Vector2d'

playerSprite = new Sprite
  width: 10
  height: 15
  origin: new Vector2d 0, 0

module.exports = playerSprite