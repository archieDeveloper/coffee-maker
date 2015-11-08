Scene = require 'core/class/Scene'
SpriteRenderer = require 'core/component/Sprite/Renderer'
Sprite = require 'core/class/Sprite'

main = new Scene
player = do main.addActor
playerSprite = new Sprite
  width: 77
  height: 32
  image: 'player.png'
playerSpriteRenderer = new SpriteRenderer(sprite: playerSprite)
player.addComponent(playerSpriteRenderer)

module.exports = main