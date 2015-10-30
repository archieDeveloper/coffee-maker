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

	Resource = __webpack_require__(1);

	canvas = __webpack_require__(2);

	context = canvas.getContext("2d");

	input = __webpack_require__(3);

	requireSprites = __webpack_require__(6);

	sprites = requireSprites.keys().map(requireSprites);

	requestAnimationFrame = __webpack_require__(8);

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
	  if (input.keyboard.isUp(65)) {
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
/* 1 */
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
/* 2 */
/***/ function(module, exports) {

	module.exports = document.createElement("canvas");


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Input, canvas, keyboard, mouse;

	canvas = __webpack_require__(2);

	keyboard = __webpack_require__(4);

	mouse = __webpack_require__(5);

	Input = (function() {
	  function Input() {}

	  Input.prototype.keyboard = keyboard;

	  Input.prototype.mouse = mouse;

	  return Input;

	})();

	module.exports = new Input;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Keyboard, downKeys, onDown, onPress, onUp, pressKeys, resetAll, resetDown, resetPress, resetUp, upKeys;

	pressKeys = {};

	downKeys = {};

	upKeys = {};

	resetAll = function() {
	  pressKeys = {};
	  downKeys = {};
	  return upKeys = {};
	};

	resetUp = function(keyCode) {
	  return delete upKeys[keyCode];
	};

	resetDown = function(keyCode) {
	  return delete downKeys[keyCode];
	};

	resetPress = function(keyCode) {
	  return delete pressKeys[keyCode];
	};

	onDown = function(keyCode) {
	  if (downKeys[keyCode] == null) {
	    return downKeys[keyCode] = true;
	  }
	};

	onUp = function(keyCode) {
	  if (upKeys[keyCode] == null) {
	    return upKeys[keyCode] = true;
	  }
	};

	onPress = function(keyCode) {
	  return pressKeys[keyCode] = true;
	};

	Keyboard = (function() {
	  function Keyboard() {
	    window.document.addEventListener('keydown', function(e) {
	      e.preventDefault();
	      resetUp(e.keyCode);
	      onPress(e.keyCode);
	      return onDown(e.keyCode);
	    });
	    window.document.addEventListener('keyup', function(e) {
	      resetPress(e.keyCode);
	      resetDown(e.keyCode);
	      return onUp(e.keyCode);
	    });
	    window.addEventListener('blur', function() {
	      return resetAll();
	    });
	  }

	  Keyboard.prototype.isPressed = function(code) {
	    return pressKeys[code] != null;
	  };

	  Keyboard.prototype.isDown = function(code) {
	    if ((downKeys[code] != null) && downKeys[code] === true) {
	      downKeys[code] = 2;
	      return true;
	    } else {
	      return false;
	    }
	  };

	  Keyboard.prototype.isUp = function(code) {
	    if ((upKeys[code] != null) && upKeys[code] === true) {
	      upKeys[code] = 2;
	      return true;
	    } else {
	      return false;
	    }
	  };

	  return Keyboard;

	})();

	module.exports = new Keyboard;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Mouse, canvas, mouseDown, mousePress, mouseUp;

	canvas = __webpack_require__(2);

	mousePress = {};

	mouseDown = {};

	mouseUp = {};

	Mouse = (function() {
	  function Mouse() {
	    canvas.addEventListener('mousemove', function(e) {
	      window.mouseX = e.offsetX === void 0 ? e.layerX : e.offsetX;
	      return window.mouseY = e.offsetY === void 0 ? e.layerY : e.offsetY;
	    });
	    canvas.addEventListener('mouseDown', function(e) {
	      mousePress[e.which] = true;
	      return mouseDown[e.which] = true;
	    });
	    canvas.addEventListener('mouseUp', function(e) {
	      delete mousePress[e.which];
	      return mouseUp[e.which] = true;
	    });
	    canvas.oncontextmenu = function() {
	      return false;
	    };
	  }

	  Mouse.prototype.isPressed = function(code) {
	    return mousePress[code] != null;
	  };

	  Mouse.prototype.isDown = function(code) {
	    return mouseDown[code] != null;
	  };

	  Mouse.prototype.isUp = function(code) {
	    return mouseUp[code] != null;
	  };

	  return Mouse;

	})();

	module.exports = new Mouse;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./player.coffee": 7
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
	webpackContext.id = 6;


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = 'sprite player';


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
	  window.setTimeout(callback, 1000 / 60);
	};


/***/ }
/******/ ]);