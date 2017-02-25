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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function MovingObject(pos, vel, rad, col, game) {
  this.pos = pos;
  this.vel = vel;
  this.rad = rad;
  this.col = col;
  this.game = game;
}


MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.col;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.rad,
    0,
    2 * Math.PI
  );

  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.pos = this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function(that) {
  const dist = Math.sqrt(Math.pow((this.pos[0] - that.pos[0]), 2) + Math.pow((this.pos[1] - that.pos[1]), 2));
  return dist < (this.rad + that.rad);
};

MovingObject.prototype.collideWith = function(that) {
};

module.exports = MovingObject;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);
const Util = __webpack_require__(2);

function Ship(game) {
  this.game = game;
  MovingObject.call(this, game.randomPosition(), [0,0], 20, 'blue', game);
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function () {
  this.vel = [0,0];
  this.pos = this.game.randomPosition();
};
module.exports = Ship;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const Util = {
  inherits (childClass, parentClass) {
    function Surrogate() {}
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  },

  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};


module.exports = Util;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(5);

function GameView(dim) {
  this.game = new Game(dim);
}

GameView.prototype.start = function(ctx) {
  setInterval(() => {
    this.game.draw(ctx);
    this.game.step();
  }, 20);
};

module.exports = GameView;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);
const Util = __webpack_require__(2);
const Ship = __webpack_require__(1);

function Asteroid(pos, game) {
  const mag = 8 * Math.random();
  const vel = Util.randomVec(mag);
  const size = 40;
  const color = 'grey';
  MovingObject.call(this, pos, vel, size, color, game);
}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship) otherObject.relocate();
};

module.exports = Asteroid;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(4);
const Ship = __webpack_require__(1);

function Game(dim) {
  this.DIM_X = dim[0];
  this.DIM_Y = dim[1];
  this.NUM_ASTEROIDS = 6;
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship(this);
}

Game.prototype.randomPosition = function() {
  return [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];
};

Game.prototype.addAsteroids = function() {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    let newAstr = new Asteroid(this.randomPosition(), this);
    this.asteroids.push(newAstr);
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  let all = this.allObjects();
  all.forEach(obj => obj.draw(ctx));
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach(obj => obj.move());
};

Game.prototype.wrap = function(pos) {
  if (pos[0] > this.DIM_X) pos[0] = 0;
  if (pos[0] < 0) pos[0] = this.DIM_X;
  if (pos[1] > this.DIM_Y) pos[1] = 0;
  if (pos[1] < 0) pos[1] = this.DIM_Y;

  return pos;
};

Game.prototype.checkCollisions = function() {
  this.allObjects().forEach((obj1, idx1) => {
    this.allObjects().forEach((obj2, idx2) => {
      if (idx1 === idx2) return false;
      if (obj1.isCollidedWith(obj2)) {
        obj1.collideWith(obj2);
      }
    });
  });
};

Game.prototype.step = function() {
  this.checkCollisions();
  this.moveObjects();
};

Game.prototype.remove = function(asteroid) {
  let i = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(i, 1);
};

Game.prototype.allObjects = function() {
  return this.asteroids.concat(this.ship);
};

module.exports = Game;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(3);

document.addEventListener("DOMContentLoaded", function(event) {
    const ctx = document.getElementById('game-canvas').getContext('2d');
    const dim = [ctx.canvas.width, ctx.canvas.height]
    new GameView(dim).start(ctx);
});


/***/ })
/******/ ]);