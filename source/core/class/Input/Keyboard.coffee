pressKeys = {}
downKeys  = {}
upKeys    = {}

resetAll = ->
  pressKeys = {}
  downKeys  = {}
  upKeys    = {}

resetUp = (keyCode)->
  delete upKeys[keyCode]

resetDown = (keyCode)->
  delete downKeys[keyCode]

resetPress = (keyCode)->
  delete pressKeys[keyCode]

onDown = (keyCode)->
  if not downKeys[keyCode]?
    downKeys[keyCode] = true

onUp = (keyCode)->
  if not upKeys[keyCode]?
    upKeys[keyCode] = true

onPress = (keyCode)->
  pressKeys[keyCode] = true

class Keyboard

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

  isPressed: (code)->
    pressKeys[code]?

  isDown: (code)->
    if downKeys[code]? and downKeys[code] is true
      downKeys[code] = 2
      true
    else
      false

  isUp: (code)->
    if upKeys[code]? and upKeys[code] is true
      upKeys[code] = 2
      true
    else
      false

module.exports = new Keyboard