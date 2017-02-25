const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');
const Ship = require('./ship.js');

function Asteroid(pos, game) {
  this.vel = Util.randomVec(5);
  MovingObject.call(this, pos, this.vel, 10, 'grey', game);
}

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  }
};

Util.inherits(Asteroid, MovingObject);
module.exports = Asteroid;
