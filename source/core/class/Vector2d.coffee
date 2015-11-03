# Класс для работы с векторами
#
# @author Arkady Kozhedub <arkadij.ok@gmail.com>
class Vector2d

  constructor: (@x = 0, @y = 0)->

  # Сложение векторов
  #
  # @param [Vector2d] Вектор который прибавляется
  #
  # @return [Vector2d] Возвращает самого себя
  add: (b)->
    @addX b
    @addY b
    @

  # Сложение векторов
  #
  # @param [Vector2d] Вектор который прибавляется
  #
  # @return [Vector2d] Возвращает самого себя
  addX: (b)->
    @x += b.x
    @

  # Сложение векторов
  #
  # @param [Vector2d] Вектор который прибавляется
  #
  # @return [Vector2d] Возвращает самого себя
  addY: (b)->
    @y += b.y
    @

  # Вычитание векторов
  #
  # @param [Vector2d] Вектор который вычитается
  #
  # @return [Vector2d] Возвращает самого себя
  subtract: (b)->
    @subtractX b
    @subtractY b
    @

  # Вычитание векторов
  #
  # @param [Vector2d] Вектор который вычитается
  #
  # @return [Vector2d] Возвращает самого себя
  subtractX: (b)->
    @x -= b.x
    @

  # Вычитание векторов
  #
  # @param [Vector2d] Вектор который вычитается
  #
  # @return [Vector2d] Возвращает самого себя
  subtractY: (b)->
    @y -= b.y
    @

  # Умножение вектора на скаляр
  #
  # @param [Number] Скалярное число на которое нужно умножить
  #
  # @return [Vector2d] Возвращает самого себя
  multiply: (scalar)->
    @multiplyX scalar
    @multiplyY scalar
    @

  # Умножение вектора на скаляр
  #
  # @param [Number] Скалярное число на которое нужно умножить
  #
  # @return [Vector2d] Возвращает самого себя
  multiplyX: (scalar)->
    @x *= scalar
    @

  # Умножение вектора на скаляр
  #
  # @param [Number] Скалярное число на которое нужно умножить
  #
  # @return [Vector2d] Возвращает самого себя
  multiplyY: (scalar)->
    @y *= scalar
    @

  # Деление вектора на скаляр
  #
  # @param [Number] Скалярное число на которое нужно поделить
  #
  # @return [Vector2d] Возвращает самого себя
  divide: (scalar)->
    @divideX scalar
    @divideY scalar
    @

  # Деление вектора на скаляр
  #
  # @param [Number] Скалярное число на которое нужно поделить
  #
  # @return [Vector2d] Возвращает самого себя
  divideX: (scalar)->
    @x /= scalar
    @

  # Деление вектора на скаляр
  #
  # @param [Number] Скалярное число на которое нужно поделить
  #
  # @return [Vector2d] Возвращает самого себя
  divideY: (scalar)->
    @y /= scalar
    @

  # Инверсия вектора
  #
  # @return [Vector2d] Возвращает самого себя
  invert: ()->
    do @invertX
    do @invertY
    @

  # Инверсия вектора
  #
  # @return [Vector2d] Возвращает самого себя
  invertX: ()->
    @x = -@x
    @

  # Инверсия вектора
  #
  # @return [Vector2d] Возвращает самого себя
  invertY: ()->
    @y = -@y
    @

  # Умножение векторов
  #
  # @param [Vector2d] Вектор с которым перемножается
  #
  # @return [Vector2d] Возвращает самого себя
  multiplyScalar: (b)->
    @multiplyScalarX b
    @multiplyScalarY b
    @

  # Умножение векторов
  #
  # @param [Vector2d] Вектор с которым перемножается
  #
  # @return [Vector2d] Возвращает самого себя
  multiplyScalarX: (b)->
    @x *= b.x
    @

  # Умножение векторов
  #
  # @param [Vector2d] Вектор с которым перемножается
  #
  # @return [Vector2d] Возвращает самого себя
  multiplyScalarY: (b)->
    @y *= b.y
    @

  # Длина вектора
  #
  # @return [Number]
  length: ()->
    Math.sqrt @x * @x + @y * @y

  # Нормализация вектора
  #
  # @return [Vector2d] Возвращает самого себя
  normalize: ()->
    len = do @length
    @x /= len
    @y /= len
    @

  # Проецирование вектора
  #
  # @param [Vector2d] Вектор на который проецируется
  #
  # @return [Vector2d]
  projection: (b)->
    c = ((@x * b.x)+(@y * b.y)) / ((b.x*b.x)+(b.y*b.y))
    @x = b.x * c
    @y = b.y * c
    @

  clone: ->
    new Vector2d @x, @y

  unfloat: ->
    @x = Math.round(@x)
    @y = Math.round(@y)
    @

  isZero: ->
    @x is 0 and @y is 0

  # Поворот вектора
  #
  # @return [Number]
  rotate: ()->
    Math.atan2(@y, @x) * 180 / Math.PI

module.exports = Vector2d