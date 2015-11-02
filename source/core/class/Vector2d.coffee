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
    @x += b.x
    @y += b.y
    @

  # Вычитание векторов
  #
  # @param [Vector2d] Вектор который вычитается
  #
  # @return [Vector2d] Возвращает самого себя
  sub: (b)->
    @x -= b.x
    @y -= b.y
    @

  # Умножение вектора на скаляр
  #
  # @param [Number] Скалярное число на которое нужно умножить
  #
  # @return [Vector2d] Возвращает самого себя
  mul: (scalar)->
    @x *= scalar
    @y *= scalar
    @

  # Деление вектора на скаляр
  #
  # @param [Number] Скалярное число на которое нужно поделить
  #
  # @return [Vector2d] Возвращает самого себя
  div: (scalar)->
    @x /= scalar
    @y /= scalar
    @

  # Умножение векторов
  #
  # @param [Vector2d] Вектор с которым перемножается
  #
  # @return [Vector2d] Возвращает самого себя
  mulScalar: (b)->
    @x *= b.x
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

  # Поворот вектора
  #
  # @return [Number]
  rotate: ()->
    Math.atan2(@y, @x) * 180 / Math.PI

module.exports = Vector2d