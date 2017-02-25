const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');

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
