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

	var Entity, e1, e2, e3, e4, mainScene;

	Entity = __webpack_require__(1);

	mainScene = __webpack_require__(4);

	e1 = new Entity;

	e2 = new Entity;

	e3 = new Entity;

	e4 = new Entity;


	/*

	Resource = require 'core/class/Resource'
	Input = require 'core/class/Input'
	Vector2d = require 'core/class/Vector2d'

	canvas = require 'core/module/canvas'
	context = canvas.getContext "2d"
	input = Input.getInstance()

	resource = Resource.getInstance()

	 * requireSprites = require.context 'game/sprite', true, /^\.\/.*\.(coffee|js)$/
	 * sprites = requireSprites.keys().map requireSprites

	mainScene = require 'game/scene/main'
	 * requireScenes = require.context 'game/scene', true, /^\.\/.*\.(coffee|js)$/
	 * scenes = requireScenes.keys().map requireScenes

	console.log mainScene

	requestAnimationFrame = require 'core/module/requestAnimationFrame'

	lastTime = do Date.now

	step = ->
	  for name, object of currentScene['object']
	    do object['step']
	draw = ->
	  context.clearRect 0, 0, canvas.width, canvas.height
	  for name, object of currentScene['object']
	    do object['draw']

	gameLoop = ->
	  now = do Date.now
	  dt = (now - lastTime) / 1000.0
	  fps = 1000.0 / (now - lastTime)

	 *  console.log(input.keyboard.isDown(87))

	 *  do step
	 *  do draw

	  context.fillStyle = "#000"
	  context.font = "12pt Arial"
	  context.fillText 'fps: '+Math.round(fps), 20, 20

	  lastTime = now
	  requestAnimationFrame gameLoop

	init = ->
	  canvas.width = 800
	  canvas.height = 600
	  document.body.appendChild canvas

	  cc = require('core/class/Component')
	  console.log(new cc)
	 *  do gameLoop

	loadImage = ->
	    resource.onReady do init

	window.onload = loadImage
	 */


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Entity;

	Entity = (function() {
	  function Entity() {}

	  Entity.prototype.create = function() {};

	  Entity.prototype.update = function() {};

	  Entity.prototype.draw = function() {};

	  return Entity;

	})();

	module.exports = Entity;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php

	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = __webpack_require__(3);

	// Maps for number <-> hex string conversion
	var _byteToHex = [];
	var _hexToByte = {};
	for (var i = 0; i < 256; i++) {
	  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	  _hexToByte[_byteToHex[i]] = i;
	}

	// **`parse()` - Parse a UUID into it's component bytes**
	function parse(s, buf, offset) {
	  var i = (buf && offset) || 0, ii = 0;

	  buf = buf || [];
	  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
	    if (ii < 16) { // Don't overflow!
	      buf[i + ii++] = _hexToByte[oct];
	    }
	  });

	  // Zero out remaining bytes if string was short
	  while (ii < 16) {
	    buf[i + ii++] = 0;
	  }

	  return buf;
	}

	// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	function unparse(buf, offset) {
	  var i = offset || 0, bth = _byteToHex;
	  return  bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}

	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html

	// random #'s we need to init node and clockseq
	var _seedBytes = _rng();

	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
	  _seedBytes[0] | 0x01,
	  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	];

	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

	// Previous uuid creation time
	var _lastMSecs = 0, _lastNSecs = 0;

	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];

	  options = options || {};

	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }

	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }

	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }

	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;

	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;

	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;

	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;

	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;

	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;

	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;

	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; n++) {
	    b[i + n] = node[n];
	  }

	  return buf ? buf : unparse(b);
	}

	// **`v4()` - Generate random UUID**

	// See https://github.com/broofa/node-uuid for API details
	function v4(options, buf, offset) {
	  // Deprecated - 'format' argument, as supported in v1.2
	  var i = buf && offset || 0;

	  if (typeof(options) == 'string') {
	    buf = options == 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};

	  var rnds = options.random || (options.rng || _rng)();

	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;

	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ii++) {
	      buf[i + ii] = rnds[ii];
	    }
	  }

	  return buf || unparse(rnds);
	}

	// Export public API
	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;
	uuid.parse = parse;
	uuid.unparse = unparse;

	module.exports = uuid;


/***/ },
/* 3 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var rng;

	if (global.crypto && crypto.getRandomValues) {
	  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	  // Moderately fast, high quality
	  var _rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(_rnds8);
	    return _rnds8;
	  };
	}

	if (!rng) {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var  _rnds = new Array(16);
	  rng = function() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }

	    return _rnds;
	  };
	}

	module.exports = rng;


	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Player, Scene, main, player;

	Scene = __webpack_require__(5);

	Player = __webpack_require__(16);

	main = new Scene;

	player = main.addActor(Player);

	console.log(player);

	module.exports = main;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Actor, Scene;

	Actor = __webpack_require__(6);

	Scene = (function() {
	  Scene.prototype.actors = [];

	  function Scene() {}

	  Scene.prototype.addActor = function(actorClass, options) {
	    var actor;
	    if (options == null) {
	      options = {};
	    }
	    actor = new actorClass();
	    if (!(actor instanceof Actor)) {
	      throw new TypeError;
	    }
	    this.actors.push(actor);
	    actor.create();
	    return actor;
	  };

	  return Scene;

	})();

	module.exports = Scene;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Actor, Component, Transform,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Component = __webpack_require__(7);

	Transform = __webpack_require__(8);

	Actor = (function(superClass) {
	  extend(Actor, superClass);

	  Actor.prototype.parent = null;

	  Actor.prototype.children = null;

	  function Actor() {
	    this.addComponent(Transform);
	  }

	  return Actor;

	})(Component);

	module.exports = Actor;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Component, Entity, uuid,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Entity = __webpack_require__(1);

	uuid = __webpack_require__(2);

	Component = (function(superClass) {
	  extend(Component, superClass);

	  Component.prototype.uuid = null;

	  Component.prototype.components = null;

	  function Component(parent) {
	    this.parent = parent;
	  }

	  Component.prototype.addComponent = function(componentClass, options) {
	    var component;
	    if (options == null) {
	      options = {};
	    }
	    component = new componentClass(this);
	    if (!(component instanceof Component)) {
	      throw new TypeError;
	    }
	    component['uuid'] = uuid.v4();
	    component.create(this, options);
	    if (this.components == null) {
	      this.components = {};
	    }
	    return this.components[component['uuid']] = component;
	  };

	  Component.prototype.getComponents = function() {
	    return console.log(this.components);
	  };

	  return Component;

	})(Entity);

	module.exports = Component;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Component, Transform, Vector2d,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Component = __webpack_require__(7);

	Vector2d = __webpack_require__(9);

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
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Renderer, Sprite, SpriteRenderer,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Renderer = __webpack_require__(11);

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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Component, Renderer,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Component = __webpack_require__(7);

	Renderer = (function(superClass) {
	  extend(Renderer, superClass);

	  function Renderer() {
	    return Renderer.__super__.constructor.apply(this, arguments);
	  }

	  return Renderer;

	})(Component);

	module.exports = Renderer;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Entity, Resource, Sprite, Vector2d, canvas, context, resource,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Entity = __webpack_require__(1);

	Vector2d = __webpack_require__(9);

	Resource = __webpack_require__(13);

	canvas = __webpack_require__(14);

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
/* 13 */
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

	  Resource.prototype.onReady = function(callback) {
	    return readyCallbacks.push(callback);
	  };

	  getImage = function(url) {
	    return resourceCache[url] || loadImage(url);
	  };

	  loadImage = function(url) {
	    var image;
	    image = new Image;
	    image.onload = function() {
	      resourceCache[url] = image;
	      if (Resource.prototype.isReady()) {
	        return readyCallbacks.forEach(function(callback) {
	          return callback();
	        });
	      }
	    };
	    resourceCache[url] = false;
	    return image.src = url;
	  };

	  return Resource;

	})();

	module.exports = Resource;


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = document.createElement("canvas");


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Sprite, Vector2d, playerSprite;

	Sprite = __webpack_require__(12);

	Vector2d = __webpack_require__(9);

	playerSprite = new Sprite({
	  width: 77,
	  height: 32,
	  image: 'player.png'
	});

	playerSprite.setOriginCenter();

	module.exports = playerSprite;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Actor, Input, Player2, SpriteRenderer, Vector2d, input,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Actor = __webpack_require__(6);

	Input = __webpack_require__(17);

	Vector2d = __webpack_require__(9);

	SpriteRenderer = __webpack_require__(10);

	input = Input.getInstance();

	Player2 = (function(superClass) {
	  extend(Player2, superClass);

	  function Player2() {
	    return Player2.__super__.constructor.apply(this, arguments);
	  }

	  Player2.prototype.create = function() {
	    this.playerSprite = __webpack_require__(15);
	    return this.addComponent(SpriteRenderer, {
	      sprite: this.playerSprite
	    });
	  };

	  Player2.prototype.update = function() {};

	  Player2.prototype.draw = function() {};

	  return Player2;

	})(Actor);

	module.exports = Player2;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Input, Keyboard, Mouse;

	Keyboard = __webpack_require__(18);

	Mouse = __webpack_require__(19);

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
/* 18 */
/***/ function(module, exports) {

	var Keyboard;

	Keyboard = (function() {
	  var blurWindowEvent, downKeys, initEvents, instance, keyDownEvent, keyUpEvent, onDown, onPress, onUp, pressKeys, resetAll, resetDown, resetPress, resetUp, upKeys;

	  pressKeys = {};

	  downKeys = {};

	  upKeys = {};

	  instance = null;

	  function Keyboard() {
	    initEvents();
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

	  initEvents = function() {
	    window.addEventListener('keydown', keyDownEvent);
	    window.addEventListener('keyup', keyUpEvent);
	    return window.addEventListener('blur', blurWindowEvent);
	  };

	  keyDownEvent = function(e) {
	    e.preventDefault();
	    resetUp(e.keyCode);
	    onPress(e.keyCode);
	    return onDown(e.keyCode);
	  };

	  keyUpEvent = function(e) {
	    resetPress(e.keyCode);
	    resetDown(e.keyCode);
	    return onUp(e.keyCode);
	  };

	  blurWindowEvent = function() {
	    return resetAll();
	  };

	  resetAll = function() {
	    var ref;
	    return ref = [{}, {}, {}], pressKeys = ref[0], downKeys = ref[1], upKeys = ref[2], ref;
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var Mouse, Vector2d, canvas;

	canvas = __webpack_require__(14);

	Vector2d = __webpack_require__(9);

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


/***/ }
/******/ ]);