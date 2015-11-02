chai = require 'chai'
do chai.should
assert = chai.assert

Vector2d = require '../source/core/class/Vector2d'

describe '#Vector2d', ->
  before ->
    console.log "Начало тестов"

  after ->
    console.log "Конец тестов"

  beforeEach ->
    console.log "Вход в тест"

  afterEach ->
    console.log "Выход из теста"

  it 'тест 1', ->
    console.log '1'
  it 'тест 2', ->
    console.log '2'