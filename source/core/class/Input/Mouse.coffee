canvas = require 'core/module/canvas'
Vector2d = require 'core/class/Vector2d'

# Класс для работы с контроллером мыши
#
# @author Arkady Kozhedub <arkadij.ok@gmail.com>
class Mouse

  # @property [Object<Number>] объект со списком нажатых клавиш
  mousePress = {}

  # @property [Object<Number>] объект со списком нажатых клавиш
  mouseDown  = {}

  # @property [Object<Number>] объект со списком отпущенных клавиш
  mouseUp    = {}

  # @property [Mouse] ссылка на самого себя
  instance   = null

  # @property [Vector2d] позиция мыши
  position: new Vector2d 0, 0

  constructor: ->
    canvas.addEventListener 'mousemove', (e)=>
      @position.x = if not e.offsetX? then e.layerX else e.offsetX
      @position.y = if not e.offsetY? then e.layerY else e.offsetY
    canvas.addEventListener 'mouseDown', (e)->
      mousePress[e.which] = true
      mouseDown[e.which] = true
    canvas.addEventListener 'mouseUp', (e)->
      delete mousePress[e.which]
      mouseUp[e.which] = true
    canvas.oncontextmenu = ()->
      false

  # Получить экзепляр самого себя
  #
  # @return [Mouse]
  @getInstance: ->
    if not instance?
      instance = new Mouse
    instance

  # Проверяет нажата ли указанная клавиша
  #
  # @param [Number] code Код клавиши
  #
  # @return [Boolean]
  isPressed: (code)->
    mousePress[code]?

  # Проверяет нажатие указанной клавиши
  #
  # @param [Number] code Код клавиши
  #
  # @return [Boolean]
  isDown: (code)->
    mouseDown[code]?

  # Проверяет отпускание указанной клавиши
  #
  # @param [Number] code Код клавиши
  #
  # @return [Boolean]
  isUp: (code)->
    mouseUp[code]?

module.exports = Mouse