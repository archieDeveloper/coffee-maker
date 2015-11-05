Scene = require 'core/class/Scene'
Vector2d = require 'core/class/Vector2d'

Player = require 'game/object/player'

class Main extends Scene

  object: 
    player: new Player

  constructor: ->
module.exports = Main