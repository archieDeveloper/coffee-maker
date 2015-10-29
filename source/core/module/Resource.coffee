resourceCache = {}
loading = []
readyCallbacks = []

loadImage = (url)->
  if resourceCache[url]
    resourceCache[url]
  else
    img = new Image
    img.onload = ->
      resourceCache[url] = img
      if do isReady
        readyCallbacks.forEach (func)->
          do func
    resourceCache[url] = false
    img.src = url

class Resource
  constructor: ->

  load: (urlOrArr)->
    if urlOrArr instanceof Array
      urlOrArr.forEach (url)->
        loadImage url
    else
      loadImage urlOrArr

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

module.exports = Resource