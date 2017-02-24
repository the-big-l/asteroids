function MovingObject(pos, vel, rad, col) {
  this.pos = pos;
  this.vel = vel;
  this.rad = rad;
  this.col = col;

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
};

// MovingObject.prototype.test = function(cavasEL) {
//
// }
//
// const canvasEl = document.getElementsByTagName("canvas")[0];
// canvasEl.height = window.innerHeight;
// canvasEl.width = window.innerWidth;

module.exports = MovingObject;
