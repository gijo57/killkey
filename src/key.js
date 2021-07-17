class Key {
  constructor(game) {
    this.game = game;
    this.width = 40;
    this.height = 20;
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

  isPicked(element) {
    return (
      element.x + element.width / 2 >=
        this.game.keyLocation.x - this.width / 2 &&
      element.x - element.width / 2 <=
        this.game.keyLocation.x + this.width / 2 &&
      element.y + element.height / 2 >=
        this.game.keyLocation.y - this.height / 2 &&
      element.y - element.height / 2 <=
        this.game.keyLocation.y + this.height / 2
    );
  }
}
