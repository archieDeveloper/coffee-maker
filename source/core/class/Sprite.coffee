Vector2d = require 'core/class/Vector2d'
Resource = require 'core/class/Resource'
canvas  = require 'core/module/canvas'
context = canvas.getContext('2d')

resource = Resource.getInstance()

# Класс спрайта
#
# @param [Object] options Параметры спрайта
# @option options [Number] width Ширина
# @option options [Number] height Высота
# @option options [Vector2d] origin Ценр спрайта
# @option options [String] image Имя файла изображения
#
class Sprite

  constructor: (options)->
    {
      @width  = 0
      @height = 0
      @origin = new Vector2d
      @image
    } = options
    if not @image?
      throw new Error 'No image'
    else
      @image = resource.load('../source/game/resource/images/'+@image)
    if not (@origin instanceof Vector2d)
      throw new Error 'No valid type'

  setOriginCenter: ->
    do @setOriginHorizontalCenter
    do @setOriginVerticalCenter

  setOriginVerticalCenter: ->
    @origin.y = @height/2

  setOriginHorizontalCenter: ->
    @origin.x = @width/2

  draw: (position) ->
    if not (position instanceof Vector2d)
      new Error 'No valid type'
    do context.save
    context.drawImage(
      resource.get @image
      position.x-@origin.x
      position.y-@origin.y
      @width
      @height
    )
    do context.restore

  drawExtend: (position,scale,rotate)->
    do context.save
    context.translate position.x, position.y
    context.rotate rotate*Math.PI/180
    context.drawImage(
      resource.get(@image),
      0,
      0,
      @width,
      @height,
      -@origin.x*scale.x,
      -@origin.y*scale.y,
      @width*scale.x,
      @height*scale.y
    )
    do context.restore

  drawVector2d: (position, vec)->
    do context.save
    do context.beginPath
    context.moveTo(position.x, position.y)
    context.lineTo(position.x+vec.x, position.y+vec.y)
    context.strokeStyle = "#000"
    do context.stroke
    do context.restore

module.exports = Sprite