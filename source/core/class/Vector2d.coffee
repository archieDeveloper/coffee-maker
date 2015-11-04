# Класс для работы с векторами
#
# @author Arkady Kozhedub <arkadij.ok@gmail.com>
class Vector2d

  constructor: (@x = 0, @y = 0)->

  add: (b)->
    @addX b
    @addY b
    @

  addX: (b)->
    @x += b.x
    @

  addY: (b)->
    @y += b.y
    @

  subtract: (b)->
    @subtractX b
    @subtractY b
    @

  subtractX: (b)->
    @x -= b.x
    @

  subtractY: (b)->
    @y -= b.y
    @

  multiply: (b)->
    @multiplyX b
    @multiplyY b
    @

  multiplyX: (b)->
    @x *= b.x
    @

  multiplyY: (b)->
    @y *= b.y
    @

  multiplyScalar: (scalar)->
    @multiplyScalarX scalar
    @multiplyScalarY scalar
    @

  multiplyScalarX: (scalar)->
    @x *= scalar
    @

  multiplyScalarY: (scalar)->
    @y *= scalar
    @

  divideScalar: (scalar)->
    @divideScalarX scalar
    @divideScalarY scalar
    @

  divideScalarX: (scalar)->
    @x /= scalar
    @

  divideScalarY: (scalar)->
    @y /= scalar
    @

  invert: ->
    do @invertX
    do @invertY
    @

  invertX: ->
    @x = -@x
    @

  invertY: ->
    @y = -@y
    @

  length: ->
    Math.sqrt @lengthSquared()

  lengthSquared: ->
    @x * @x + @y * @y

  normalize: ->
    len = do @length
    @x /= len
    @y /= len
    @

  project: (b)->
    c = ((@x * b.x)+(@y * b.y)) / ((b.x*b.x)+(b.y*b.y))
    @x = b.x * c
    @y = b.y * c
    @

  clone: ->
    new Vector2d @x, @y

  round: ->
    @x = Math.round(@x)
    @y = Math.round(@y)
    @

  isZero: ->
    @x is 0 and @y is 0

  rotate: ->
    Math.atan2(@y, @x) * 180 / Math.PI

module.exports = Vector2d