Scene = require 'core/class/Scene'
SpriteRenderer = require 'core/component/Sprite/Renderer'
Sprite = require 'core/class/Sprite'

main = new Scene
player = do main.addActor
playerSprite = require 'game/sprite/player'
player.addComponent(SpriteRenderer, sprite: playerSprite)

module.exports = main