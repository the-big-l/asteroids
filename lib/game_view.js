const Game = require('./game.js');

function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
}

GameView.prototype.start = function(ctx) {
  setInterval(() => {
    this.game.draw(ctx);
    this.game.step();
  }, 20);
};

module.exports = GameView;
