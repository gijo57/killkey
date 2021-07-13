class Key {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
  }

  draw() {
    this.game.ctx.save();
    this.game.ctx.fillStyle = 'red';
    this.game.ctx.font = '20px Arial';
    this.game.ctx.fillText(
      'KEY',
      this.game.keyLocation.x,
      this.game.keyLocation.y
    );
    this.game.ctx.restore();
  }
}
