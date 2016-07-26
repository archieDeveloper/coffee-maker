Entity = require 'core/class/Entity'
uuid = require 'uuid'

class Component extends Entity

  uuid: null
  components: null

  constructor: (@parent)->

  addComponent: (componentClass, options = {})->
    component = new componentClass(@)
    if not (component instanceof Component)
      throw new TypeError
    component['uuid'] = uuid.v4()
    component.create @, options
    @components = {} if not @components?
    @components[component['uuid']] = component

  getComponents: ()->
    console.log @components

module.exports = Component