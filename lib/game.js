const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');

function Game() {
  this.DIM_X = 800;
  this.DIM_Y = 800;
  this.NUM_ASTEROIDS = 8;
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship(this);
}

Game.prototype.randomPosition = function() {
  return [Math.random() * 800, Math.random() * 800];
};

Game.prototype.addAsteroids = function() {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    let newAstr = new Asteroid(this.randomPosition(), this);
    this.asteroids.push(newAstr);
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, 800, 800);
  let all = this.allObjects();
  all.forEach((obj) => obj.draw(ctx));
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach((obj) => obj.move());
};

Game.prototype.wrap = function(pos) {
  if (pos[0] > this.DIM_X) {
    pos[0] = 0;
  }else if (pos[0] < 0) {
    pos[0] = this.DIM_X;
  }
  if (pos[1] > this.DIM_Y) {
    pos[1] = 0;
  }else if (pos[1] < 0) {
    pos[1] = this.DIM_Y;
  }
  return pos;
};

Game.prototype.checkCollisions = function() {
  this.allObjects().forEach((obj1, idx) => {
    this.allObjects().slice(idx + 1).forEach((obj2) => {
    // this.allObjects().forEach((obj2) => {
      if (obj1.isCollidedWith(obj2)) {
        obj1.collideWith(obj2);
        obj2.collideWith(obj1);
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
