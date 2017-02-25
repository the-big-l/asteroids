const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');
const Ship = require('./ship.js');

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
