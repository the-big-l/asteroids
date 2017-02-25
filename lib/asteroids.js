const GameView = require('./game_view.js');

document.addEventListener("DOMContentLoaded", function(event) {
    const ctx = document.getElementById('game-canvas').getContext('2d');
    const dim = [ctx.canvas.width, ctx.canvas.height]
    new GameView(dim).start(ctx);
});
