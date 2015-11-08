Actor = require 'core/class/Actor'

class Scene

  actors: []

  constructor: ->

  addActor: ()->
    newActor = new Actor
    @actors.push newActor
    newActor

module.exports = Scene