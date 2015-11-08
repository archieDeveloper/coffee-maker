Entity = require 'core/class/Entity'
Component = require 'core/class/Component'
Transform = require 'core/component/Transform'

class Actor extends Entity

  parent: null

  children: null

  components: []

  constructor: ->
    transform = new Transform
    @addComponent transform

  addComponent: (component)->
    if not (component instanceof Component)
      throw new TypeError
    component.addParent @
    @components.push component

module.exports = Actor