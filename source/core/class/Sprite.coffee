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
      @width = 0
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

  # Установить центр спрайта на середину изображения
  setOriginCenter: ->
    do @setOriginHorizontalCenter
    do @setOriginVerticalCenter

  # Установить центр спрайта на середину изображения по вертикали
  setOriginVerticalCenter: ->
    @origin.y = @height/2

  # Установить центр спрайта на середину изображения по горизонтали
  setOriginHorizontalCenter: ->
    @origin.x = @width/2

  # Отрисовать спрайт
  #
  # @param [Vector2d] position Позиция для отрисовки
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

module.exports = Sprite