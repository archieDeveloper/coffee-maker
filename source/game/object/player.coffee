Entity = require 'core/class/Entity'
Input = require 'core/class/Input'
Vector2d = require 'core/class/Vector2d'

input = Input.getInstance();

class Player extends Entity

  constructor: ->
    @playerSprite = require 'game/sprite/player'
    @rudderSprite = require 'game/sprite/rudder'
    @wheelSprite = require 'game/sprite/wheel'

    @speed = new Vector2d
    @force = new Vector2d
    @friction = 0.9

    @transform.position = new Vector2d 100, 200
    @transform.rotate = 0

    @rudderPosition = new Vector2d 60, 60
    @rudderAngle = 0
    @rudderScale = new Vector2d 0.25, 0.25

    @wheel1 = new Vector2d
    @wheel2 = new Vector2d
    @wheel3 = new Vector2d
    @wheel4 = new Vector2d

  step: ->
    @speed.multiplyScalar @friction
    @transform.position.add @speed

    @force.x = Math.cos(@transform.rotate/180*Math.PI)*1;
    @force.y = Math.sin(@transform.rotate/180*Math.PI)*1;

    if input.keyboard.isPressed(87)
      @speed.add @force

    if input.keyboard.isPressed(65)
      @rudderAngle -= 10
    if input.keyboard.isPressed(68)
      @rudderAngle += 10
    if @rudderAngle >= 360*1.5
      @rudderAngle = 360*1.5
    if @rudderAngle <= -360*1.5
      @rudderAngle = -360*1.5

    # @transform.rotate += 1
  draw: ->
    @rudderSprite.drawExtend @rudderPosition, @rudderScale, @rudderAngle
    @playerSprite.drawExtend @transform.position, @transform.scale, @transform.rotate

    @playerSprite.drawVector2d @transform.position, @speed

    wheelLengthdirX = lengthdirX(22, @transform.rotate)
    wheelLengthdirY = lengthdirY(22, @transform.rotate)
    wheelLengthdirX2 = lengthdirX(10, @transform.rotate+90)
    wheelLengthdirY2 = lengthdirY(10, @transform.rotate+90)

    @wheel1.x = @transform.position.x-wheelLengthdirX-wheelLengthdirX2
    @wheel1.y = @transform.position.y-wheelLengthdirY-wheelLengthdirY2
    @wheelSprite.drawExtend(
      @wheel1
      @transform.scale
      @transform.rotate
    )
    @wheel2.x = @transform.position.x-wheelLengthdirX+wheelLengthdirX2
    @wheel2.y = @transform.position.y-wheelLengthdirY+wheelLengthdirY2
    @wheelSprite.drawExtend(
      @wheel2
      @transform.scale
      @transform.rotate
    )

    @wheel3.x = @transform.position.x+wheelLengthdirX-wheelLengthdirX2
    @wheel3.y = @transform.position.y+wheelLengthdirY-wheelLengthdirY2
    @wheelSprite.drawExtend(
      @wheel3
      @transform.scale
      @transform.rotate+@rudderAngle
    )
    @wheel4.x = @transform.position.x+wheelLengthdirX+wheelLengthdirX2
    @wheel4.y = @transform.position.y+wheelLengthdirY+wheelLengthdirY2
    @wheelSprite.drawExtend(
      @wheel4
      @transform.scale
      @transform.rotate+@rudderAngle
    )

  lengthdirX = (len, dir)->
    Math.cos(dir*Math.PI/180)*len

  lengthdirY = (len, dir)->
    Math.sin(dir*Math.PI/180)*len

module.exports = Player