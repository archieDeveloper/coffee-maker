resourceCache = {}
loading = []
readyCallbacks = []

_load = (url)->
  if resourceCache[url]
    return resourceCache[url]
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
        _load url
    else
      _load urlOrArr

  get: (url)->
    resourceCache[url]

  isReady: ->
    ready = true
    for k of resourceCache
      if resourceCache.hasOwnProperty(k) && !resourceCache[k]
        ready = false
    ready

  onReady: (func)->
    readyCallbacks.push func

module.exports = Resource