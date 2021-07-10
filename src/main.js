const canvas = document.querySelector('canvas');

const startScreen = document.querySelector('#start');
const gameScreen = document.querySelector('#game');
const gameOverScreen = document.querySelector('#game-over');

const mapNumber = 1;
const map = maps[mapNumber - 1];

const game = new Game(canvas, map, TILE_SIZE);
game.start();
