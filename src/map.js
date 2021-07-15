class Map {
  constructor(game) {
    this.game = game;
    this.map = maps[mapNumber - 1];
    this.tileSize = TILE_SIZE;
    this.offsetX = 0;
    this.offsetY = 0;
    this.horizontalTileCount = maps[mapNumber - 1][0].length;
    this.verticalTileCount = maps[mapNumber - 1].length;
  }

  draw() {
    this.game.ctx.save();
    for (let i = 0; i < this.horizontalTileCount; i++) {
      for (let j = 0; j < this.verticalTileCount; j++) {
        if (this.map[j][i] === 1) {
          this.game.ctx.fillStyle = 'black';
          this.game.ctx.fillRect(
            0 + i * this.tileSize - this.offsetX,
            0 + j * this.tileSize - this.offsetY,
            this.tileSize,
            this.tileSize
          );
        } else {
          this.game.ctx.fillStyle = 'grey';
          this.game.ctx.fillRect(
            0 + i * this.tileSize - this.offsetX,
            0 + j * this.tileSize - this.offsetY,
            this.tileSize,
            this.tileSize
          );
          if (this.map[j][i] === 'K') {
            this.game.keyLocation.x = 0 + i * this.tileSize - this.offsetX;
            this.game.keyLocation.y = 0 + j * this.tileSize - this.offsetY;
          }
        }
      }
    }
    this.game.ctx.restore();
  }

  moveCamera() {
    if (this.game.player.directionVector) {
      this.directionVector = {
        x: -this.game.player.directionVector.x,
        y: -this.game.player.directionVector.y
      };

      this.offsetX += this.directionVector.x * this.game.player.speed * 3;
      this.offsetY += this.directionVector.y * this.game.player.speed * 3;
    }
  }

  collide(element) {
    for (let i = 0; i < this.horizontalTileCount; i++) {
      for (let j = 0; j < this.verticalTileCount; j++) {
        if (this.map[j][i] === 1) {
          let x = 0 + i * this.tileSize - this.offsetX;
          let y = 0 + j * this.tileSize - this.offsetY;

          if (
            element.x + element.width / 2 >= x - this.tileSize / 2 &&
            element.x - element.width / 2 <= x + this.tileSize / 2 &&
            element.y + element.height / 2 >= y - this.tileSize / 2 &&
            element.y - element.height / 2 <= y + this.tileSize / 2
          ) {
            return true;
          }
        }
      }
    }
  }
}
