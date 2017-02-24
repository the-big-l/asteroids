const Asteroid = require('./asteroid.js');

function Game() {
  this.DIM_X = 800;
  this.DIM_Y = 800;
  this.NUM_ASTEROIDS = 100;
  this.asteroids = [];
  this.addAsteroids();
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
  this.asteroids.forEach((astr) => astr.draw(ctx));
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach((astr) => astr.move());
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
  this.asteroids.forEach((astr1, idx) => {
    this.asteroids.slice(idx + 1).forEach((astr2) => {
      if (astr1.isCollidedWith(astr2)) {
        astr1.collideWith(astr2);
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

module.exports = Game;
