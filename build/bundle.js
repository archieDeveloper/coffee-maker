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

	var Input, Resource, canvas, context, draw, gameLoop, init, lastTime, loadImage, requestAnimationFrame, requireSprites, sprites, step;

	Resource = __webpack_require__(1);

	Input = __webpack_require__(2);

	requireSprites = __webpack_require__(3);

	sprites = requireSprites.keys().map(requireSprites);

	requestAnimationFrame = __webpack_require__(5);

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
/* 1 */
/***/ function(module, exports) {

	var Resource;

	Resource = (function() {
	  function Resource() {}

	  Resource.prototype._resourceCache = {};

	  Resource.prototype._loading = [];

	  Resource.prototype._readyCallbacks = [];

	  Resource.prototype._load = function(url) {
	    var img;
	    if (this._resourceCache[url]) {
	      return this._resourceCache[url];
	    } else {
	      img = new Image;
	      img.onload = function() {
	        this._resourceCache[url] = img;
	        if (isReady()) {
	          return this._readyCallbacks.forEach(function(func) {
	            return func();
	          });
	        }
	      };
	      this._resourceCache[url] = false;
	      return img.src = url;
	    }
	  };

	  Resource.prototype.load = function(urlOrArr) {
	    if (urlOrArr instanceof Array) {
	      return urlOrArr.forEach(function(url) {
	        return this._load(url);
	      });
	    } else {
	      return this._load(urlOrArr);
	    }
	  };

	  Resource.prototype.get = function(url) {
	    return this._resourceCache[url];
	  };

	  Resource.prototype.isReady = function() {
	    var k, ready;
	    ready = true;
	    for (k in this._resourceCache) {
	      if (this._resourceCache.hasOwnProperty(k) && !this._resourceCache[k]) {
	        ready = false;
	      }
	    }
	    return ready;
	  };

	  Resource.prototype.onReady = function(func) {
	    return this._readyCallbacks.push(func);
	  };

	  return Resource;

	})();

	module.exports = Resource;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var clearEvent, isKeyDown, isKeyPressed, isKeyUp, isMouseDown, isMousePressed, isMouseUp, keyDown, keyPress, keyUp, kkey, mouseDown, mousePress, mouseUp, setMyCursor, whatKey;

	keyPress = {};

	keyDown = {};

	keyUp = {};

	kkey = void 0;

	mousePress = {};

	mouseDown = {};

	mouseUp = {};

	document.addEventListener('keydown', function(e) {
	  e.preventDefault();
	  keyPress[e.keyCode] = true;
	  keyDown[e.keyCode] = true;
	  kkey = e.keyCode;
	});

	document.addEventListener('keyup', function(e) {
	  delete keyPress[e.keyCode];
	  keyUp[e.keyCode] = true;
	});

	window.addEventListener('blur', function() {
	  keyPress = {};
	  keyDown = {};
	  keyUp = {};
	});

	isKeyPressed = function(code) {
	  if (keyPress[code] !== null) {
	    return true;
	  }
	};

	isKeyDown = function(code) {
	  if (keyDown[code] !== null) {
	    return true;
	  }
	};

	isKeyUp = function(code) {
	  if (keyUp[code] !== null) {
	    return true;
	  }
	};

	whatKey = function() {
	  console.log(kkey);
	};

	canvas.addEventListener('mousemove', function(e) {
	  window.mouseX = e.offsetX === void 0 ? e.layerX : e.offsetX;
	  window.mouseY = e.offsetY === void 0 ? e.layerY : e.offsetY;
	});

	canvas.addEventListener('mousedown', function(e) {
	  mousePress[e.which] = true;
	  mouseDown[e.which] = true;
	});

	canvas.addEventListener('mouseup', function(e) {
	  delete mousePress[e.which];
	  mouseUp[e.which] = true;
	});

	canvas.oncontextmenu = function(e) {
	  return false;
	};

	isMousePressed = function(code) {
	  if (mousePress[code] !== null) {
	    return true;
	  }
	};

	isMouseDown = function(code) {
	  if (mouseDown[code] !== null) {
	    return true;
	  }
	};

	isMouseUp = function(code) {
	  if (mouseUp[code] !== null) {
	    return true;
	  }
	};

	setMyCursor = function(sprite) {
	  if (canvas.style.cursor !== 'none') {
	    canvas.style.cursor = 'none';
	  }
	  drawSprite(sprite, mouseX, mouseY);
	};

	clearEvent = function() {
	  mouseDown = {};
	  mouseUp = {};
	  keyDown = {};
	  keyUp = {};
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./player.coffee": 4
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
	webpackContext.id = 3;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = 'sprite player';


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
	  window.setTimeout(callback, 1000 / 60);
	};


/***/ }
/******/ ]);