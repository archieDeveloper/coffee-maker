
# Класс по работе с ресурсами
#
# @author Arkady Kozhedub <arkadij.ok@gmail.com>
class Resource

  # @property [Resource] Ссылка на самого себя
  instance = null

  # @property [Object<Image>] Кэш изображений
  resourceCache  = {}

  # @property [Array<Function>] Набор функций которые нужно вызвать при загрузке ресурсов
  readyCallbacks = []

  constructor: ->

  # Получить экзепляр самого себя
  #
  # @return [Resource]
  @getInstance: ->
    if not instance?
      instance = new Resource
    instance

  # Загрузить изображения
  #
  # @param [Array] urlOrArr Url до изображения или массив Url'ов
  #
  # @return [Image]
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

  # Проверяет готовы ли ресурсы
  #
  # @return [Boolean]
  isReady: ->
    ready = true
    for k of resourceCache
      if resourceCache.hasOwnProperty(k) and not resourceCache[k]
        ready = false
    ready

  # Добавляет функцию в список callback'оф
  #
  # @param [Function] func Callback который отработает как только закончится загрузка ресурсов
  onReady: (func)->
    readyCallbacks.push func

  # Получает изображение из кеша или подгружает
  #
  # @param [String] url Url до изображения
  #
  # @return [Image]
  getImage = (url)->
    resourceCache[url] or loadImage(url)

  # Загружает изображение
  #
  # @param [String] url Url до изображения
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