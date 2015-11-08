Renderer = require 'core/component/Renderer'
Sprite = require 'core/class/Sprite'

# Класс отрисовки спрайта
#
# @param [Object] options Параметры отрисовки
# @option options [Sprite] sprite Спрайт
#
class SpriteRenderer extends Renderer

  create: (options)->
    {
      @sprite = null
    } = options
    if not (@sprite instanceof Sprite)
      throw new TypeError
    @parent.spriteRenderer = @
module.exports = SpriteRenderer