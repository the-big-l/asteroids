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
  // console.log('check');
  const dist = Math.sqrt(Math.pow((this.pos[0] - that.pos[0]), 2) + Math.pow((this.pos[1] - that.pos[1]), 2));
  return dist < (this.rad + that.rad);
};

MovingObject.prototype.collideWith = function(that) {
  // this.game.remove(this);
  // this.game.remove(that);
};

module.exports = MovingObject;
