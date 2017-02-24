const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');

function Asteroid(pos, game) {
  this.vel = Util.randomVec(5);
  MovingObject.call(this, pos, this.vel, 5, 'grey', game);
}

Util.inherits(Asteroid, MovingObject);
module.exports = Asteroid;
