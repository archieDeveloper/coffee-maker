Entity = require 'core/class/Entity'
Input = require 'core/class/Input'
Vector2d = require 'core/class/Vector2d'

input = Input.getInstance();

class Player extends Entity

  constructor: ->
    @playerSprite = require 'game/sprite/player'

    @speed = new Vector2d
    @force = new Vector2d
    @friction = 0.9

    @transform.position = new Vector2d 100, 200
    @transform.rotate = 0

  step: ->
    @speed.multiplyScalar @friction
    @transform.position.add @speed

    @force.x = Math.cos(@transform.rotate/180*Math.PI)*1;
    @force.y = Math.sin(@transform.rotate/180*Math.PI)*1;

    if input.keyboard.isPressed(87)
      @speed.add @force
    if input.keyboard.isPressed(65)
      @transform.rotate -= (1)*@speed.length()
    if input.keyboard.isPressed(68)
      @transform.rotate += (1)*@speed.length()

  draw: ->
    @playerSprite.drawExtend @transform.position, @transform.scale, @transform.rotate

module.exports = Player