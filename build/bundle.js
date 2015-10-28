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

	var CMRequestAnimationFrame, canvas, context, draw, gameLoop, init, lastTime, loadImage, resource, step;

	resource = __webpack_require__(2);

	CMRequestAnimationFrame = (function() {
	  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
	    window.setTimeout(callback, 1000 / 60);
	  };
	})();

	canvas = document.createElement("canvas");

	context = canvas.getContext("2d");

	lastTime = Date.now();

	step = function() {};

	draw = function() {
	  return context.clearRect(0, 0, canvas.width, canvas.height);
	};

	gameLoop = function() {
	  var dt, fps, now;
	  now = Date.now();
	  dt = (now - lastTime) / 1000.0;
	  fps = 1000.0 / (now - lastTime);
	  step();
	  draw();
	  context.fillStyle = "#000";
	  context.font = "12pt Arial";
	  context.fillText('fps: ' + Math.round(fps), 20, 20);
	  lastTime = now;
	  return CMRequestAnimationFrame(gameLoop);
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
/* 2 */
/***/ function(module, exports) {

	var Resource, _load, loading, readyCallbacks, resourceCache;

	resourceCache = {};

	loading = [];

	readyCallbacks = [];

	_load = function(url) {
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
	        return _load(url);
	      });
	    } else {
	      return _load(urlOrArr);
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


/***/ }
/******/ ]);