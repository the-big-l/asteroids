const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');

function Ship(game) {
  this.game = game;
  MovingObject.call(this, game.randomPosition(), [0,0], 40, 'blue', game);
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function () {
  this.vel = [0,0];
  this.pos = this.game.randomPosition();
};

Ship.prototype.draw = function(ctx) {
  // ctx.fillStyle = this.col;
  // ctx.beginPath();
  //
  // ctx.arc(
  //   this.pos[0],
  //   this.pos[1],
  //   this.rad,
  //   0.2 * Math.PI,
  //   1.6 * Math.PI
  // );
  //
  // ctx.fill();
// An arc with an opening at the right for the mouth
ctx.beginPath();
ctx.arc(this.pos[0], this.pos[1], this.rad, 0.2 * Math.PI, 1.8 * Math.PI, false);

// The mouth
// A line from the end of the arc to the centre
ctx.lineTo(this.pos[0], this.pos[1]);

// A line from the centre of the arc to the start
ctx.closePath();

// Fill the pacman shape with yellow
ctx.fillStyle = "yellow";
ctx.fill();

// Draw the black outline (optional)
ctx.stroke();

// Draw the eye
ctx.beginPath();
const eyeX = this.pos[0] + 2.5;
const eyeY = this.pos[1] - (this.rad / 2);
ctx.arc(eyeX, eyeY, 5, 0, 2 * Math.PI, false);
ctx.fillStyle = "rgb(0, 0, 0)";
ctx.fill();
};
module.exports = Ship;
