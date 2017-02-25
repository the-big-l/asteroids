const Game = require('./game.js');

function GameView(dim) {
  this.game = new Game(dim);
}

GameView.prototype.start = function(ctx) {
  setInterval(() => {
    this.game.draw(ctx);
    this.game.step();
  }, 20);
};

module.exports = GameView;
