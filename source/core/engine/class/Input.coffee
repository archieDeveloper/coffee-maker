canvas = require '../module/canvas'

class Input

    _keyPress: {}
    _keyDown: {}
    _keyUp: {}
    _kkey: undefined
    _mousePress: {}
    _mouseDown: {}
    _mouseUp: {}

    constructor: ->
        document.addEventListener 'keyDown', (e)->
            console.log 'sdfsa'
            do e.preventDefault
            @_keyPress[e.keyCode] = true
            @_keyDown[e.keyCode] = true
            @_kkey = e.keyCode
            return

        document.addEventListener 'keyUp', (e)->
            delete @_keyPress[e.keyCode]
            @_keyUp[e.keyCode] = true
            return

        window.addEventListener 'blur', ->
            @_keyPress = {}
            @_keyDown = {}
            @_keyUp = {}
            return

        canvas.addEventListener 'mousemove', (e)->
            window.mouseX = if e.offsetX == undefined then e.layerX else e.offsetX
            window.mouseY = if e.offsetY == undefined then e.layerY else e.offsetY
            return

        canvas.addEventListener 'mouseDown', (e)->
            @_mousePress[e.which] = true
            @_mouseDown[e.which] = true
            return

        canvas.addEventListener 'mouseUp', (e)->
            delete _mousePress[e.which]
            @_mouseUp[e.which] = true
            return
        canvas.oncontextmenu = (e)->
            false

    isKeyPressed: (code)->
        if @_keyPress[code] != null
            true

    isKeyDown: (code)->
        if @_keyDown[code] != null
            true

    isKeyUp: (code)->
        if @_keyUp[code] != null
            true

    whatKey: ()->
        console.log @_kkey
        return

    isMousePressed: (code)->
        if @_mousePress[code] != null
            true

    isMouseDown: (code)->
        if @_mouseDown[code] != null
            true

    isMouseUp: (code)->
        if @_mouseUp[code] != null
            true

    # setMyCursor = (sprite)->
    #     if canvas.style.cursor != 'none'
    #         canvas.style.cursor = 'none'
    #     drawSprite sprite, mouseX, mouseY
    #     return

    clearEvent: ->
        @_mouseDown = {}
        @_mouseUp = {}
        @_keyDown = {}
        @_keyUp = {}
        return

module.exports = new Input
