class Enemy {
  constructor(game, x, y) {
    this.game = game;
    this.health = 50;
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 20;
    this.direction = 0;
    this.speed = 1;
    this.dead = false;
  }

  draw() {
    if (!this.dead) {
      this.rotate();
    }
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.game.ctx.restore();
    this.direction++;
  }

  move() {
    let rad = (this.direction + 90) * (Math.PI / 180);
    const x = Math.cos(rad);
    const y = Math.sin(rad);

    this.x -= x * this.speed;
    this.y -= y * this.speed;
  }

  die() {
    this.dead = true;
  }

  collide(element) {
    return (
      element.x + element.width / 2 >= this.x - this.width / 2 &&
      element.x - element.width / 2 <= this.x + this.width / 2 &&
      element.y + element.height / 2 >= this.y - this.height / 2 &&
      element.y - element.height / 2 <= this.y + this.height / 2
    );
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
      this.x - 50,
      this.y - 50,
      this.direction
    );
    this.game.projectiles.push(projectile);
  }
}
