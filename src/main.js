const canvas = document.querySelector('canvas');

const startScreen = document.querySelector('#start');
const gameScreen = document.querySelector('#game');
const gameOverScreen = document.querySelector('#game-over');

const game = new Game(canvas);
game.start();
