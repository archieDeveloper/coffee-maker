/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Resource, canvas, context, count, draw, gameLoop, init, input, lastTime, loadImage, requestAnimationFrame, requireSprites, sprites, step;

	Resource = __webpack_require__(7);

	canvas = __webpack_require__(8);

	context = canvas.getContext("2d");

	input = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"core/engine/class/Input\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	requireSprites = __webpack_require__(4);

	sprites = requireSprites.keys().map(requireSprites);

	requestAnimationFrame = __webpack_require__(9);

	lastTime = Date.now();

	step = function() {};

	draw = function() {
	  return context.clearRect(0, 0, canvas.width, canvas.height);
	};

	count = 0;

	gameLoop = function() {
	  var dt, fps, now;
	  now = Date.now();
	  dt = (now - lastTime) / 1000.0;
	  fps = 1000.0 / (now - lastTime);
	  step();
	  if (input.isKeyUp(65)) {
	    count++;
	  }
	  draw();
	  context.fillStyle = "#000";
	  context.font = "12pt Arial";
	  context.fillText('fps: ' + Math.round(fps), 20, 20);
	  context.fillText('count: ' + count, 20, 100);
	  lastTime = now;
	  return requestAnimationFrame(gameLoop);
	};

	init = function() {
	  canvas.width = 800;
	  canvas.height = 600;
	  document.body.appendChild(canvas);
	  return gameLoop();
	};

	loadImage = function() {
	  return init();
	};

	window.onload = loadImage;


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./player.coffee": 5
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 4;


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = 'sprite player';


/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	var Resource, loadImage, loading, readyCallbacks, resourceCache;

	resourceCache = {};

	loading = [];

	readyCallbacks = [];

	loadImage = function(url) {
	  var img;
	  if (resourceCache[url]) {
	    return resourceCache[url];
	  } else {
	    img = new Image;
	    img.onload = function() {
	      resourceCache[url] = img;
	      if (isReady()) {
	        return readyCallbacks.forEach(function(func) {
	          return func();
	        });
	      }
	    };
	    resourceCache[url] = false;
	    return img.src = url;
	  }
	};

	Resource = (function() {
	  function Resource() {}

	  Resource.prototype.load = function(urlOrArr) {
	    if (urlOrArr instanceof Array) {
	      return urlOrArr.forEach(function(url) {
	        return loadImage(url);
	      });
	    } else {
	      return loadImage(urlOrArr);
	    }
	  };

	  Resource.prototype.get = function(url) {
	    return resourceCache[url];
	  };

	  Resource.prototype.isReady = function() {
	    var k, ready;
	    ready = true;
	    for (k in resourceCache) {
	      if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
	        ready = false;
	      }
	    }
	    return ready;
	  };

	  Resource.prototype.onReady = function(func) {
	    return readyCallbacks.push(func);
	  };

	  return Resource;

	})();

	module.exports = Resource;


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = document.createElement("canvas");


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
	  window.setTimeout(callback, 1000 / 60);
	};


/***/ }
/******/ ]);