const canvas = document.querySelector('canvas');

const mapListElement = document.querySelector('#maps');

const mapList = document.querySelector('ol').children;

const chosenMap = document.querySelector('#chosen');

let mapNumber;

for (let i = 0; i < mapList.length; i++) {
  mapList[i].addEventListener('click', (e) => {
    startButton.style.display = '';
    mapButton.style.display = '';
    mapListElement.style.display = 'none';
    chosenMap.style.display = 'flex';
    mapNumber = Number(e.target.id);
    chosenMap.querySelector('span').innerText = mapNumber;
  });
}

const startScreen = document.querySelector('#start');
const startButton = document.querySelector('#btn-start');
const mapButton = document.querySelector('#btn-map');

const gameScreen = document.querySelector('#game');

const gameOverScreen = document.querySelector('#game-over');
const tryAgainButton = document.querySelector('#btn-again');

const screens = { startScreen, gameScreen, gameOverScreen };

const game = new Game(canvas, screens, tryAgainButton);

startButton.addEventListener('click', () => {
  game.start();
});

mapButton.addEventListener('click', () => {
  mapListElement.style.display = 'flex';
  startButton.style.display = 'none';
  mapButton.style.display = 'none';
  chosenMap.style.display = 'none';
});
