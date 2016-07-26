Actor = require 'core/class/Actor'
Input = require 'core/class/Input'
Vector2d = require 'core/class/Vector2d'
SpriteRenderer = require 'core/component/Sprite/Renderer'

input = Input.getInstance();

class Player2 extends Actor

  create: ->
    @playerSprite = require 'game/sprite/player'
    @addComponent(SpriteRenderer, sprite: @playerSprite)

  update: ->

  draw: ->



module.exports = Player2