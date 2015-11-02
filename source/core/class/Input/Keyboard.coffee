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
    window.document.addEventListener 'keydown', (e)->
      do e.preventDefault
      resetUp e.keyCode
      onPress e.keyCode
      onDown e.keyCode
    window.document.addEventListener 'keyup', (e)->
      resetPress e.keyCode
      resetDown e.keyCode
      onUp e.keyCode
    window.addEventListener 'blur', ->
      do resetAll

  # Получить экзепляр самого себя
  #
  # @return [Keyboard]
  @getInstance: ->
    if not instance?
      instance = new Keyboard
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
    if downKeys[code]? and downKeys[code] is true
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
    if upKeys[code]? and upKeys[code] is true
      upKeys[code] = 2
      true
    else
      false

  # Сбрасывает все события
  resetAll = ->
    pressKeys = {}
    downKeys  = {}
    upKeys    = {}

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
    if not downKeys[keyCode]?
      downKeys[keyCode] = true

  # Устанавливает событие отпускания указанной клвавиши
  #
  # @param [Number] keyCode Код клавиши
  onUp = (keyCode)->
    if not upKeys[keyCode]?
      upKeys[keyCode] = true

  # Устанавливает событие нажатия указанной клвавиши
  #
  # @param [Number] keyCode Код клавиши
  onPress = (keyCode)->
    pressKeys[keyCode] = true

module.exports = Keyboard