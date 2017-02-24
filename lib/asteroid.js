const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');

function Asteroid(pos) {
  this.vel = Util.randomVec(10);
  MovingObject.call(this, pos, this.vel, 20, 'grey');
}

Util.inherits(Asteroid, MovingObject);
module.exports = Asteroid;
