const canvas = document.querySelector('canvas');

const mapList = document.querySelector('ol').children;
let mapNumber = 1;

for (let i = 0; i < mapList.length; i++) {
  mapList[i].addEventListener('click', (e) => {
    mapNumber = Number(e.target.id);
    document.querySelector('h1').innerHTML = mapNumber;
  });
}

const startScreen = document.querySelector('#start');
const startButton = document.querySelector('#btn-start');

const gameScreen = document.querySelector('#game');

const gameOverScreen = document.querySelector('#game-over');
const tryAgainButton = document.querySelector('#btn-again');

const screens = { startScreen, gameScreen, gameOverScreen };

const game = new Game(canvas, screens, tryAgainButton);

startButton.addEventListener('click', () => {
  game.start();
});
