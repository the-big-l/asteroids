const GameView = require('./game_view.js');

document.addEventListener("DOMContentLoaded", function(event) {
    const ctx = document.getElementById('game-canvas').getContext('2d');
    new GameView().start(ctx);
});
