Scene = require 'core/class/Scene'
Player = require 'game/actor/player2'

main = new Scene

player = main.addActor Player
console.log(player)


module.exports = main