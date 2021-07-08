class Projectile {
  constructor(game, x, y, direction) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 3;
    this.height = 3;
    this.direction = direction;
    this.speed = 10;
  }

  draw() {
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  runLogic() {
    let rad = (this.direction + 90) * (Math.PI / 180);
    const x = Math.cos(rad);
    const y = Math.sin(rad);

    this.x -= x * this.speed;
    this.y -= y * this.speed;
  }
}
