
# Класс по работе с ресурсами
#
class Resource

  # Ссылка на самого себя
  instance = null

  resourceCache  = {}
  loading        = []
  readyCallbacks = []

  constructor: ->

  # Получить экзепляр самого себя
  @getInstance: ->
    if not instance?
      instance = new Resource
    instance

  # Загрузить изображения
  #
  # @param [Array] urlOrArr Url до изображения или массив Url'ов
  load: (urlOrArr)->
    if urlOrArr instanceof Array
      urlOrArr.forEach (url)->
        getImage url
    else
      getImage urlOrArr

  # Получить изображение
  #
  # @param [String] url Url До изображения
  #
  # @return [Image]
  get: (url)->
    resourceCache[url]

  isReady: ->
    ready = true
    for k of resourceCache
      if resourceCache.hasOwnProperty(k) and not resourceCache[k]
        ready = false
    ready

  onReady: (func)->
    readyCallbacks.push func

  getImage = (url)->
    resourceCache[url] or loadImage(url)

  loadImage = (url)->
    img = new Image
    img.onload = ->
      resourceCache[url] = img
      if do Resource::isReady
        readyCallbacks.forEach (func)->
          do func
    resourceCache[url] = false
    img.src = url

module.exports = Resource