Entity = require 'core/class/Entity'
Component = require 'core/class/Component'
Transform = require 'core/component/Transform'

class Actor extends Entity

  parent: null

  children: null

  components: []

  constructor: ->
    @addComponent Transform

  addComponent: (componentClass, options = {})->
    component = new componentClass
    if not (component instanceof Component)
      throw new TypeError
    component.create @, options
    @components.push component

module.exports = Actor