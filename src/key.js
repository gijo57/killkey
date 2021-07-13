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

  playerHasPicked(element) {
    return (
      element.x + element.width / 2 >= this.x - this.width / 2 &&
      element.x - element.width / 2 <= this.x + this.width / 2 &&
      element.y + element.height / 2 >= this.y - this.height / 2 &&
      element.y - element.height / 2 <= this.y + this.height / 2
    );
  }
}
