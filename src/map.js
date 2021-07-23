const textureImage = new Image();
textureImage.src = 'images/textures.png';
const doorImage = new Image();
doorImage.src = 'images/door.png';
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
          this.game.ctx.drawImage(
            textureImage,
            3 * this.tileSize,
            2.5 * this.tileSize,
            22,
            22,
            0 + i * this.tileSize - this.offsetX,
            0 + j * this.tileSize - this.offsetY,
            this.tileSize + 2,
            this.tileSize + 2
          );
        } else {
          this.game.ctx.drawImage(
            textureImage,
            1.5 * this.tileSize,
            0,
            22,
            22,
            0 + i * this.tileSize - this.offsetX,
            0 + j * this.tileSize - this.offsetY,
            this.tileSize + 1,
            this.tileSize + 1
          );
          if (this.map[j][i] === 'K') {
            this.game.keyLocation.x = 0 + i * this.tileSize - this.offsetX;
            this.game.keyLocation.y = 0 + j * this.tileSize - this.offsetY;
          } else if (this.map[j][i] === 'D') {
            this.game.ctx.drawImage(
              textureImage,
              3 * this.tileSize,
              2.5 * this.tileSize,
              24,
              24,
              0 + i * this.tileSize - this.offsetX,
              0 + j * this.tileSize - this.offsetY,
              this.tileSize,
              this.tileSize
            );
            this.game.ctx.drawImage(
              doorImage,
              0,
              0,
              30,
              30,
              0 + i * this.tileSize - this.offsetX,
              0 + j * this.tileSize - this.offsetY,
              this.tileSize,
              this.tileSize
            );
          }
        }
      }
    }
    this.game.ctx.restore();
  }

  drawTile(i, j) {
    this.game.ctx.fillRect(
      0 + i * this.tileSize - this.offsetX,
      0 + j * this.tileSize - this.offsetY,
      this.tileSize,
      this.tileSize
    );
  }

  moveCamera(direction) {
    const previousPosition = { x: this.offsetX, y: this.offsetY };
    if (this.game.player.directionVector) {
      this.directionVector = {
        x: -this.game.player.directionVector.x,
        y: -this.game.player.directionVector.y
      };
    }
    let newPosition;

    if (direction === 'forward') {
      newPosition = {
        x: this.offsetX + this.directionVector.x * this.game.player.speed,
        y: this.offsetY + this.directionVector.y * this.game.player.speed
      };
    }

    if (direction === 'backward') {
      newPosition = {
        x: this.offsetX - this.directionVector.x * (this.game.player.speed - 1),
        y: this.offsetY - this.directionVector.y * (this.game.player.speed - 1)
      };
    }

    if (this.collide(this.game.player, newPosition.x, newPosition.y)) {
      this.offsetX = previousPosition.x;
      this.offsetY = previousPosition.y;
    } else {
      this.offsetX = newPosition.x;
      this.offsetY = newPosition.y;
    }
  }

  setEnemyStartPositions() {
    for (let i = 0; i < this.horizontalTileCount; i++) {
      for (let j = 0; j < this.verticalTileCount; j++) {
        if (this.map[j][i] === 'E') {
          this.game.enemyStartPositions.push({
            x: 0 + i * this.tileSize - this.offsetX,
            y: 0 + j * this.tileSize - this.offsetY
          });
        }
      }
    }
  }

  collide(element, newOffsetX, newOffsetY) {
    for (let i = 0; i < this.horizontalTileCount; i++) {
      for (let j = 0; j < this.verticalTileCount; j++) {
        let x, y;
        if (!(element instanceof Projectile) && !(element instanceof Enemy)) {
          x = 0 + i * this.tileSize - newOffsetX;
          y = 0 + j * this.tileSize - newOffsetY;
        } else {
          if (element instanceof Enemy) {
            x = 0 + i * this.tileSize;
            y = 0 + j * this.tileSize;
          } else {
            x = 0 + i * this.tileSize - this.offsetX;
            y = 0 + j * this.tileSize - this.offsetY;
          }
        }

        if (
          element.x + element.height / 2 >= x &&
          element.x - element.height / 2 <= x + this.tileSize &&
          element.y + element.height / 2 >= y &&
          element.y - element.height / 2 <= y + this.tileSize
        ) {
          if (this.map[j][i] === 1) {
            return true;
          }
          if (this.map[j][i] === 'D') {
            if (this.game.player.hasKey) {
              this.game.passLevel();
            } else {
              return true;
            }
          }
        }
      }
    }
  }
}
