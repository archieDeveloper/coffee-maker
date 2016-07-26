class Keyboard

  # @property [Object<Number>] объект со списком нажатых клавиш
  pressKeys = {}

  # @property [Object<Number>] объект со списком нажатых клавиш
  downKeys  = {}

  # @property [Object<Number>] объект со списком отпущенных клавиш
  upKeys    = {}

  # @property [Mouse] ссылка на самого себя
  instance = null

  constructor: ->
    do initEvents

  # Получить экзепляр самого себя
  #
  # @return [Keyboard]
  @getInstance: ->
    instance = new Keyboard if not instance?
    instance

  # Проверяет нажатие указанной клавиши
  #
  # @param [Number] code Код клавиши
  #
  # @return [Boolean]
  isPressed: (code)->
    pressKeys[code]?

  # Проверяет нажатие указанной клавиши
  #
  # @param [Number] code Код клавиши
  #
  # @return [Boolean]
  isDown: (code)->
    if downKeys[code]? and downKeys[code] is on
      downKeys[code] = 2
      true
    else
      false

  # Проверяет отпускание указанной клавиши
  #
  # @param [Number] code Код клавиши
  #
  # @return [Boolean]
  isUp: (code)->
    if upKeys[code]? and upKeys[code] is on
      upKeys[code] = 2
      true
    else
      false

  # Иницилизация событий
  initEvents = ->
    window.addEventListener 'keydown', keyDownEvent
    window.addEventListener 'keyup', keyUpEvent
    window.addEventListener 'blur', blurWindowEvent

  # Событие нажатия клавиши
  keyDownEvent = (e)->
    do e.preventDefault
    resetUp e.keyCode
    onPress e.keyCode
    onDown e.keyCode

  # Событие отпускания клавиши
  keyUpEvent = (e)->
    resetPress e.keyCode
    resetDown e.keyCode
    onUp e.keyCode

  # Сбрасываем все события при разфокусировки окна
  blurWindowEvent = ->
    do resetAll

  # Сбрасывает все события
  resetAll = ->
    [pressKeys, downKeys, upKeys] = [{}, {}, {}]

  # Сбрасывает событие поднятия указанной клвавиши
  #
  # @param [Number] keyCode Код клавиши
  resetUp = (keyCode)->
    delete upKeys[keyCode]

  # Сбрасывает событие нажития указанной клвавиши
  #
  # @param [Number] keyCode Код клавиши
  resetDown = (keyCode)->
    delete downKeys[keyCode]

  # Сбрасывает событие нажатия указанной клвавиши
  #
  # @param [Number] keyCode Код клавиши
  resetPress = (keyCode)->
    delete pressKeys[keyCode]

  # Устанавливает событие нажатия указанной клвавиши
  #
  # @param [Number] keyCode Код клавиши
  onDown = (keyCode)->
    downKeys[keyCode] = on if not downKeys[keyCode]?

  # Устанавливает событие отпускания указанной клвавиши
  #
  # @param [Number] keyCode Код клавиши
  onUp = (keyCode)->
    upKeys[keyCode] = on if not upKeys[keyCode]?

  # Устанавливает событие нажатия указанной клвавиши
  #
  # @param [Number] keyCode Код клавиши
  onPress = (keyCode)->
    pressKeys[keyCode] = on

module.exports = Keyboard