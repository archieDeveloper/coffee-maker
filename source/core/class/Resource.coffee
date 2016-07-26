
# Класс по работе с ресурсами
#
# @author Arkady Kozhedub <arkadij.ok@gmail.com>
class Resource

  # @property [Resource] Ссылка на самого себя
  instance = null

  # @property [Object<Image>] Кэш изображений
  resourceCache = {}

  # @property [Array<Function>] Набор функций которые нужно вызвать при загрузке ресурсов
  readyCallbacks = []

  constructor: ->

  # Получить экзепляр самого себя
  #
  # @return [Resource]
  @getInstance: ->
    instance = new Resource if not instance?
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
      ready = false if resourceCache.hasOwnProperty(k) and not resourceCache[k]
    ready

  # Добавляет функцию в список callback'оф
  #
  # @param [Function] func Callback который отработает как только закончится загрузка ресурсов
  onReady: (callback)->
    readyCallbacks.push callback

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
    image = new Image
    image.onload = ->
      resourceCache[url] = image
      if do Resource::isReady
        readyCallbacks.forEach (callback)->
          do callback
    resourceCache[url] = false
    image.src = url

module.exports = Resource