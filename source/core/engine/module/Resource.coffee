class Resource
  constructor: ->

  _resourceCache: {}

  _loading: []

  _readyCallbacks: []

  _load: (url)->
    if @_resourceCache[url]
      return @_resourceCache[url]
    else
      img = new Image
      img.onload = ->
        @_resourceCache[url] = img
        if do isReady
          @_readyCallbacks.forEach (func)->
            do func
      @_resourceCache[url] = false
      img.src = url

  load: (urlOrArr)->
    if urlOrArr instanceof Array
      urlOrArr.forEach (url)->
        @_load url
    else
      @_load urlOrArr

  get: (url)->
    @_resourceCache[url]

  isReady: ->
    ready = true
    for k of @_resourceCache
      if @_resourceCache.hasOwnProperty(k) && !@_resourceCache[k]
        ready = false
    ready

  onReady: (func)->
    @_readyCallbacks.push func

module.exports = Resource