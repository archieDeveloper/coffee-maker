Component = require 'core/class/Component'
Transform = require 'core/component/Transform'

class Actor extends Component

  parent: null

  children: null

  constructor: ->
    @addComponent Transform


module.exports = Actor