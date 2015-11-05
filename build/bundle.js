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

	var Input, MainScene, Resource, Vector2d, canvas, context, currentScene, draw, gameLoop, init, input, lastTime, loadImage, requestAnimationFrame, resource, step;

	Resource = __webpack_require__(1);

	Input = __webpack_require__(2);

	Vector2d = __webpack_require__(6);

	canvas = __webpack_require__(5);

	context = canvas.getContext("2d");

	input = Input.getInstance();

	resource = Resource.getInstance();

	MainScene = __webpack_require__(7);

	currentScene = new MainScene;

	console.log(currentScene);

	requestAnimationFrame = __webpack_require__(9);

	lastTime = Date.now();

	step = function() {
	  var name, object, ref, results;
	  ref = currentScene['object'];
	  results = [];
	  for (name in ref) {
	    object = ref[name];
	    results.push(object['step']());
	  }
	  return results;
	};

	draw = function() {
	  var name, object, ref, results;
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  ref = currentScene['object'];
	  results = [];
	  for (name in ref) {
	    object = ref[name];
	    results.push(object['draw']());
	  }
	  return results;
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
	  return resource.onReady(init());
	};

	window.onload = loadImage;


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Resource;

	Resource = (function() {
	  var getImage, instance, loadImage, readyCallbacks, resourceCache;

	  instance = null;

	  resourceCache = {};

	  readyCallbacks = [];

	  function Resource() {}

	  Resource.getInstance = function() {
	    if (instance == null) {
	      instance = new Resource;
	    }
	    return instance;
	  };

	  Resource.prototype.load = function(urlOrArr) {
	    if (urlOrArr instanceof Array) {
	      return urlOrArr.forEach(function(url) {
	        return getImage(url);
	      });
	    } else {
	      return getImage(urlOrArr);
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

	  getImage = function(url) {
	    return resourceCache[url] || loadImage(url);
	  };

	  loadImage = function(url) {
	    var img;
	    img = new Image;
	    img.onload = function() {
	      resourceCache[url] = img;
	      if (Resource.prototype.isReady()) {
	        return readyCallbacks.forEach(function(func) {
	          return func();
	        });
	      }
	    };
	    resourceCache[url] = false;
	    return img.src = url;
	  };

	  return Resource;

	})();

	module.exports = Resource;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Input, Keyboard, Mouse;

	Keyboard = __webpack_require__(3);

	Mouse = __webpack_require__(4);

	Input = (function() {
	  var instance;

	  instance = null;

	  Input.prototype.keyboard = Keyboard.getInstance();

	  Input.prototype.mouse = Mouse.getInstance();

	  function Input() {}

	  Input.getInstance = function() {
	    if (instance == null) {
	      instance = new Input;
	    }
	    return instance;
	  };

	  return Input;

	})();

	module.exports = Input;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Keyboard;

	Keyboard = (function() {
	  var downKeys, instance, onDown, onPress, onUp, pressKeys, resetAll, resetDown, resetPress, resetUp, upKeys;

	  pressKeys = {};

	  downKeys = {};

	  upKeys = {};

	  instance = null;

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

	  Keyboard.getInstance = function() {
	    if (instance == null) {
	      instance = new Keyboard;
	    }
	    return instance;
	  };

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

	  return Keyboard;

	})();

	module.exports = Keyboard;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Mouse, Vector2d, canvas;

	canvas = __webpack_require__(5);

	Vector2d = __webpack_require__(6);

	Mouse = (function() {
	  var instance, mouseDown, mousePress, mouseUp;

	  mousePress = {};

	  mouseDown = {};

	  mouseUp = {};

	  instance = null;

	  Mouse.prototype.position = new Vector2d(0, 0);

	  function Mouse() {
	    canvas.addEventListener('mousemove', (function(_this) {
	      return function(e) {
	        _this.position.x = e.offsetX == null ? e.layerX : e.offsetX;
	        return _this.position.y = e.offsetY == null ? e.layerY : e.offsetY;
	      };
	    })(this));
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

	  Mouse.getInstance = function() {
	    if (instance == null) {
	      instance = new Mouse;
	    }
	    return instance;
	  };

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

	module.exports = Mouse;


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = document.createElement("canvas");


/***/ },
/* 6 */
/***/ function(module, exports) {

	var Vector2d;

	Vector2d = (function() {
	  function Vector2d(x, y) {
	    this.x = x != null ? x : 0;
	    this.y = y != null ? y : 0;
	  }

	  Vector2d.prototype.add = function(b) {
	    this.addX(b);
	    this.addY(b);
	    return this;
	  };

	  Vector2d.prototype.addX = function(b) {
	    this.x += b.x;
	    return this;
	  };

	  Vector2d.prototype.addY = function(b) {
	    this.y += b.y;
	    return this;
	  };

	  Vector2d.prototype.subtract = function(b) {
	    this.subtractX(b);
	    this.subtractY(b);
	    return this;
	  };

	  Vector2d.prototype.subtractX = function(b) {
	    this.x -= b.x;
	    return this;
	  };

	  Vector2d.prototype.subtractY = function(b) {
	    this.y -= b.y;
	    return this;
	  };

	  Vector2d.prototype.multiply = function(b) {
	    this.multiplyX(b);
	    this.multiplyY(b);
	    return this;
	  };

	  Vector2d.prototype.multiplyX = function(b) {
	    this.x *= b.x;
	    return this;
	  };

	  Vector2d.prototype.multiplyY = function(b) {
	    this.y *= b.y;
	    return this;
	  };

	  Vector2d.prototype.multiplyScalar = function(scalar) {
	    this.multiplyScalarX(scalar);
	    this.multiplyScalarY(scalar);
	    return this;
	  };

	  Vector2d.prototype.multiplyScalarX = function(scalar) {
	    this.x *= scalar;
	    return this;
	  };

	  Vector2d.prototype.multiplyScalarY = function(scalar) {
	    this.y *= scalar;
	    return this;
	  };

	  Vector2d.prototype.divideScalar = function(scalar) {
	    this.divideScalarX(scalar);
	    this.divideScalarY(scalar);
	    return this;
	  };

	  Vector2d.prototype.divideScalarX = function(scalar) {
	    this.x /= scalar;
	    return this;
	  };

	  Vector2d.prototype.divideScalarY = function(scalar) {
	    this.y /= scalar;
	    return this;
	  };

	  Vector2d.prototype.invert = function() {
	    this.invertX();
	    this.invertY();
	    return this;
	  };

	  Vector2d.prototype.invertX = function() {
	    this.x = -this.x;
	    return this;
	  };

	  Vector2d.prototype.invertY = function() {
	    this.y = -this.y;
	    return this;
	  };

	  Vector2d.prototype.length = function() {
	    return Math.sqrt(this.lengthSquared());
	  };

	  Vector2d.prototype.lengthSquared = function() {
	    return this.x * this.x + this.y * this.y;
	  };

	  Vector2d.prototype.normalize = function() {
	    var len;
	    len = this.length();
	    this.x /= len;
	    this.y /= len;
	    return this;
	  };

	  Vector2d.prototype.project = function(b) {
	    var c;
	    c = ((this.x * b.x) + (this.y * b.y)) / ((b.x * b.x) + (b.y * b.y));
	    this.x = b.x * c;
	    this.y = b.y * c;
	    return this;
	  };

	  Vector2d.prototype.clone = function() {
	    return new Vector2d(this.x, this.y);
	  };

	  Vector2d.prototype.round = function() {
	    this.x = Math.round(this.x);
	    this.y = Math.round(this.y);
	    return this;
	  };

	  Vector2d.prototype.isZero = function() {
	    return this.x === 0 && this.y === 0;
	  };

	  Vector2d.prototype.rotate = function() {
	    return Math.atan2(this.y, this.x) * 180 / Math.PI;
	  };

	  return Vector2d;

	})();

	module.exports = Vector2d;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Main, Player, Scene, Vector2d,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Scene = __webpack_require__(8);

	Vector2d = __webpack_require__(6);

	Player = __webpack_require__(10);

	Main = (function(superClass) {
	  extend(Main, superClass);

	  Main.prototype.object = {
	    player: new Player
	  };

	  function Main() {}

	  return Main;

	})(Scene);

	module.exports = Main;


/***/ },
/* 8 */
/***/ function(module, exports) {

	var Scene;

	Scene = (function() {
	  function Scene() {}

	  Scene.prototype.object = {};

	  return Scene;

	})();

	module.exports = Scene;


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
	  window.setTimeout(callback, 1000 / 60);
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Entity, Input, Player, Vector2d, input,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Entity = __webpack_require__(11);

	Input = __webpack_require__(2);

	Vector2d = __webpack_require__(6);

	input = Input.getInstance();

	Player = (function(superClass) {
	  extend(Player, superClass);

	  function Player() {
	    this.playerSprite = __webpack_require__(12);
	    this.speed = new Vector2d;
	    this.force = new Vector2d;
	    this.friction = 0.9;
	    this.transform.position = new Vector2d(100, 200);
	    this.transform.rotate = 0;
	  }

	  Player.prototype.step = function() {
	    this.speed.multiplyScalar(this.friction);
	    this.transform.position.add(this.speed);
	    this.force.x = Math.cos(this.transform.rotate / 180 * Math.PI) * 1;
	    this.force.y = Math.sin(this.transform.rotate / 180 * Math.PI) * 1;
	    if (input.keyboard.isPressed(87)) {
	      this.speed.add(this.force);
	    }
	    if (input.keyboard.isPressed(65)) {
	      this.transform.rotate -= 1. * this.speed.length();
	    }
	    if (input.keyboard.isPressed(68)) {
	      return this.transform.rotate += 1. * this.speed.length();
	    }
	  };

	  Player.prototype.draw = function() {
	    return this.playerSprite.drawExtend(this.transform.position, this.transform.scale, this.transform.rotate);
	  };

	  return Player;

	})(Entity);

	module.exports = Player;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Entity, Vector2d;

	Vector2d = __webpack_require__(6);

	Entity = (function() {
	  Entity.prototype.transform = {
	    position: new Vector2d,
	    rotate: new Vector2d(1, 0),
	    scale: new Vector2d(1, 1)
	  };

	  function Entity() {}

	  Entity.prototype.create = function() {};

	  Entity.prototype.step = function() {};

	  Entity.prototype.draw = function() {};

	  return Entity;

	})();

	module.exports = Entity;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Sprite, Vector2d, playerSprite;

	Sprite = __webpack_require__(13);

	Vector2d = __webpack_require__(6);

	playerSprite = new Sprite({
	  width: 77,
	  height: 32,
	  image: 'player.png'
	});

	playerSprite.setOriginCenter();

	module.exports = playerSprite;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Resource, Sprite, Vector2d, canvas, context, resource;

	Vector2d = __webpack_require__(6);

	Resource = __webpack_require__(1);

	canvas = __webpack_require__(5);

	context = canvas.getContext('2d');

	resource = Resource.getInstance();

	Sprite = (function() {
	  function Sprite(options) {
	    var ref, ref1, ref2;
	    this.width = (ref = options.width) != null ? ref : 0, this.height = (ref1 = options.height) != null ? ref1 : 0, this.origin = (ref2 = options.origin) != null ? ref2 : new Vector2d, this.image = options.image;
	    if (this.image == null) {
	      throw new Error('No image');
	    } else {
	      this.image = resource.load('../source/game/resource/images/' + this.image);
	    }
	    if (!(this.origin instanceof Vector2d)) {
	      throw new Error('No valid type');
	    }
	  }

	  Sprite.prototype.setOriginCenter = function() {
	    this.setOriginHorizontalCenter();
	    return this.setOriginVerticalCenter();
	  };

	  Sprite.prototype.setOriginVerticalCenter = function() {
	    return this.origin.y = this.height / 2;
	  };

	  Sprite.prototype.setOriginHorizontalCenter = function() {
	    return this.origin.x = this.width / 2;
	  };

	  Sprite.prototype.draw = function(position) {
	    if (!(position instanceof Vector2d)) {
	      new Error('No valid type');
	    }
	    context.save();
	    context.drawImage(resource.get(this.image), position.x - this.origin.x, position.y - this.origin.y, this.width, this.height);
	    return context.restore();
	  };

	  Sprite.prototype.drawExtend = function(position, scale, rotate) {
	    context.save();
	    context.translate(position.x, position.y);
	    context.rotate(rotate * Math.PI / 180);
	    context.drawImage(resource.get(this.image), 0, 0, this.width, this.height, -this.origin.x * scale.x, -this.origin.y * scale.y, this.width * scale.x, this.height * scale.y);
	    return context.restore();
	  };

	  return Sprite;

	})();

	module.exports = Sprite;


/***/ }
/******/ ]);