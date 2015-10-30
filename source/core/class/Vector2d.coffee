class Vector2d

  constructor: (@x, @y)->

# сложение векторов
  add: (b)->
    @x += b.x
    @y += b.y
    @

# вычитание векторов
  sub: (b)->
    @x -= b.x
    @y -= b.y
    @

# умножение вектора на скаляр
  mul: (scalar)->
    @x *= scalar
    @y *= scalar
    @

# деление вектора на скаляр
  div: (scalar)->
    @x /= scalar
    @y /= scalar
    @

# умножение векторов
  mulScalar: (b)->
    @x *= b.x
    @y *= b.y
    @

# длина вектора
  length: ()->
    Math.sqrt @x * @x + @y * @y

# нормализация вектора
  normalize: ()->
    len = do @length
    @x /= len
    @y /= len
    @

# проецирование вектора
  projection: (b)->
    c = do b.normalize
    scl = @mulScalar(b)
    c.mul(scl)

# поворот вектора
  rotate: (a)->
    Math.atan2(a.y, a.x) * 180 / Math.PI

module.exports = Vector2d