class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 20;
    this.direction = 0;
    this.speed = 3;
  }

  draw() {
    this.rotate();
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.game.ctx.restore();
  }

  runLogic() {}

  move(direction) {
    let rad = (this.direction + 90) * (Math.PI / 180);
    const x = Math.cos(rad);
    const y = Math.sin(rad);

    if (direction === 'forward') {
      this.x -= x * this.speed;
      this.y -= y * this.speed;
    } else if (direction === 'backward') {
      this.x += x * this.speed;
      this.y += y * this.speed;
    }
  }

  rotate() {
    this.direction %= 360;

    this.game.ctx.save();
    let rad = (this.direction * Math.PI) / 180;
    this.game.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    this.game.ctx.rotate(rad);
    this.game.ctx.translate(
      -(this.x + this.width / 2),
      -(this.y + this.height / 2)
    );
  }

  shoot() {
    const projectile = new Projectile(
      this.game,
      this.x + this.width,
      this.y,
      this.direction
    );
    this.game.projectiles.push(projectile);
    console.log(this.game.projectiles);
  }
}
