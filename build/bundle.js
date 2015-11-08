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

	var Input, Resource, Vector2d, canvas, context, draw, gameLoop, init, input, lastTime, loadImage, mainScene, requestAnimationFrame, resource, step;

	Resource = __webpack_require__(1);

	Input = __webpack_require__(2);

	Vector2d = __webpack_require__(6);

	canvas = __webpack_require__(5);

	context = canvas.getContext("2d");

	input = Input.getInstance();

	resource = Resource.getInstance();

	mainScene = __webpack_require__(7);

	console.log(mainScene);

	requestAnimationFrame = __webpack_require__(15);

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

	var Scene, Sprite, SpriteRenderer, main, player, playerSprite;

	Scene = __webpack_require__(8);

	SpriteRenderer = __webpack_require__(22);

	Sprite = __webpack_require__(12);

	main = new Scene;

	player = main.addActor();

	playerSprite = __webpack_require__(11);

	player.addComponent(SpriteRenderer, {
	  sprite: playerSprite
	});

	module.exports = main;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Actor, Scene;

	Actor = __webpack_require__(16);

	Scene = (function() {
	  Scene.prototype.actors = [];

	  function Scene() {}

	  Scene.prototype.addActor = function() {
	    var newActor;
	    newActor = new Actor;
	    this.actors.push(newActor);
	    return newActor;
	  };

	  return Scene;

	})();

	module.exports = Scene;


/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Entity, Vector2d;

	Vector2d = __webpack_require__(6);

	Entity = (function() {
	  function Entity() {}

	  Entity.prototype.create = function() {};

	  Entity.prototype.update = function() {};

	  Entity.prototype.draw = function() {};

	  return Entity;

	})();

	module.exports = Entity;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Sprite, Vector2d, playerSprite;

	Sprite = __webpack_require__(12);

	Vector2d = __webpack_require__(6);

	playerSprite = new Sprite({
	  width: 77,
	  height: 32,
	  image: 'player.png'
	});

	playerSprite.setOriginCenter();

	module.exports = playerSprite;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Entity, Resource, Sprite, Vector2d, canvas, context, resource,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Entity = __webpack_require__(10);

	Vector2d = __webpack_require__(6);

	Resource = __webpack_require__(1);

	canvas = __webpack_require__(5);

	context = canvas.getContext('2d');

	resource = Resource.getInstance();

	Sprite = (function(superClass) {
	  extend(Sprite, superClass);

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

	  Sprite.prototype.drawVector2d = function(position, vec) {
	    context.save();
	    context.beginPath();
	    context.moveTo(position.x, position.y);
	    context.lineTo(position.x + vec.x, position.y + vec.y);
	    context.strokeStyle = "#000";
	    context.stroke();
	    return context.restore();
	  };

	  return Sprite;

	})(Entity);

	module.exports = Sprite;


/***/ },
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports) {

	module.exports = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
	  window.setTimeout(callback, 1000 / 60);
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Actor, Component, Entity, Transform,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Entity = __webpack_require__(10);

	Component = __webpack_require__(18);

	Transform = __webpack_require__(17);

	Actor = (function(superClass) {
	  extend(Actor, superClass);

	  Actor.prototype.parent = null;

	  Actor.prototype.children = null;

	  Actor.prototype.components = [];

	  function Actor() {
	    this.addComponent(Transform);
	  }

	  Actor.prototype.addComponent = function(componentClass, options) {
	    var component;
	    if (options == null) {
	      options = {};
	    }
	    component = new componentClass;
	    if (!(component instanceof Component)) {
	      throw new TypeError;
	    }
	    component.create(this, options);
	    return this.components.push(component);
	  };

	  return Actor;

	})(Entity);

	module.exports = Actor;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Component, Transform, Vector2d,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Component = __webpack_require__(18);

	Vector2d = __webpack_require__(6);

	Transform = (function(superClass) {
	  extend(Transform, superClass);

	  function Transform() {
	    return Transform.__super__.constructor.apply(this, arguments);
	  }

	  Transform.prototype.create = function(parent, options) {
	    var ref, ref1, ref2;
	    this.position = (ref = options.position) != null ? ref : new Vector2d, this.scale = (ref1 = options.scale) != null ? ref1 : new Vector2d(1, 1), this.rotate = (ref2 = options.rotate) != null ? ref2 : new Vector2d(1, 0);
	    return parent.trasform = this;
	  };

	  return Transform;

	})(Component);

	module.exports = Transform;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Component, Entity,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Entity = __webpack_require__(10);

	Component = (function(superClass) {
	  extend(Component, superClass);

	  function Component() {
	    return Component.__super__.constructor.apply(this, arguments);
	  }

	  return Component;

	})(Entity);

	module.exports = Component;


/***/ },
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var Renderer, Sprite, SpriteRenderer,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Renderer = __webpack_require__(23);

	Sprite = __webpack_require__(12);

	SpriteRenderer = (function(superClass) {
	  extend(SpriteRenderer, superClass);

	  function SpriteRenderer() {
	    return SpriteRenderer.__super__.constructor.apply(this, arguments);
	  }

	  SpriteRenderer.prototype.create = function(parent, options) {
	    var ref;
	    this.sprite = (ref = options.sprite) != null ? ref : null;
	    if (!(this.sprite instanceof Sprite)) {
	      throw new TypeError;
	    }
	    return parent.spriteRenderer = this;
	  };

	  return SpriteRenderer;

	})(Renderer);

	module.exports = SpriteRenderer;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Component, Renderer,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Component = __webpack_require__(18);

	Renderer = (function(superClass) {
	  extend(Renderer, superClass);

	  function Renderer() {
	    return Renderer.__super__.constructor.apply(this, arguments);
	  }

	  return Renderer;

	})(Component);

	module.exports = Renderer;


/***/ }
/******/ ]);