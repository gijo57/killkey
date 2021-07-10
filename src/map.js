class Map {
  constructor(game) {
    this.game = game;
    this.map = maps[mapNumber - 1];
    this.tileSize = TILE_SIZE;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  draw() {
    this.horizontalTileCount = this.map[0].length;
    this.verticalTileCount = this.map.length;
    this.game.ctx.save();
    for (let i = 0; i < this.horizontalTileCount; i++) {
      for (let j = 0; j < this.verticalTileCount; j++) {
        if (this.map[j][i] === 1) {
          this.game.ctx.fillStyle = 'black';
        } else if (this.map[j][i] === 0) {
          this.game.ctx.fillStyle = 'grey';
        }

        this.game.ctx.fillRect(
          0 + i * this.tileSize.width - this.offsetX,
          0 + j * this.tileSize.height - this.offsetY,
          this.tileSize.width,
          this.tileSize.height
        );
        this.game.ctx.fillRect(
          0 + i * this.tileSize.width + 1 - this.offsetX,
          0 + j * this.tileSize.height + 1 - this.offsetY,
          this.tileSize.width - 1,
          this.tileSize.height - 2
        );
      }
    }
    this.game.ctx.restore();
  }
}
