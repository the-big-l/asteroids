const Asteroid = require('./asteroid.js');

function Game() {
  this.DIM_X = 800;
  this.DIM_Y = 800;
  this.NUM_ASTEROIDS = 10;
  this.asteroids = [];
  this.addAsteroids();
}

Game.prototype.randomPosition = function() {
  return [Math.random() * 800, Math.random() * 800];
};

Game.prototype.addAsteroids = function() {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    let newAstr = new Asteroid(this.randomPosition());
    this.asteroids.push(newAstr);
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, 800, 800);
  this.asteroids.forEach((astr) => astr.draw(ctx));
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach((astr) => astr.move());
};

module.exports = Game;
