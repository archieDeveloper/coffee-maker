Actor = require 'core/class/Actor'

class Scene

  actors: []

  constructor: ->

  addActor: (actorClass, options = {})->
    actor = new actorClass()
    if not (actor instanceof Actor)
      throw new TypeError
    @actors.push actor
    actor.create()
    actor

module.exports = Scene