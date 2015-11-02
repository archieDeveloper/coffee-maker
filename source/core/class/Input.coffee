Keyboard = require 'core/class/Input/Keyboard'
Mouse    = require 'core/class/Input/Mouse'

# Класс для работы с контроллерами
#
# @author Arkady Kozhedub <arkadij.ok@gmail.com>
class Input

  # @property [Input] Ссылка на самого себя
  instance = null

  # @property [Keyboard] Ссылка на объект работы с клавиатурой
  keyboard: Keyboard.getInstance()

  # @property [Mouse] Ссылка на объект работы с мышью
  mouse: Mouse.getInstance()

  constructor: ->

  # Получить ссылку на самого себя
  #
  # @return [Input]
  @getInstance: ->
    if not instance?
      instance = new Input
    instance


module.exports = Input
