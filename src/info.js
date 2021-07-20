class Info {
  constructor(game) {
    this.game = game;
    this.level = mapNumber;
  }

  draw(health) {
    this.game.ctx.save();
    this.game.ctx.font = '40px Arial';
    this.game.ctx.fillStyle = 'red';
    this.game.ctx.fillText(`Level: ${this.level}`, 200, 35);
    this.game.ctx.fillText(`Health: ${health}`, 400, 35);
    this.game.ctx.restore();
  }
}
