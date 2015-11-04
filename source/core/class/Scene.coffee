class Scene

  objects: {}

  create: ->

  addObject: (obj, name)->
    if @objects[name]?
      throw new Error 'Объект с таким именем уже существует'
    @objects[name] = obj

module.exports = Scene