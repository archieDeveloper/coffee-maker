Entity = require 'core/class/Entity'


class Component extends Entity

  parent: null

  constructor: (@options = {})->

  addParent: (parent)->
    if parent?
      @parent = parent
    @create(@options)

  create: (options)->

module.exports = Component