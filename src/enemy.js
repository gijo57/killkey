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
      //this.rotate();
    }
    this.game.ctx.fillRect(
      this.x - this.game.map.offsetX,
      this.y - this.game.map.offsetY,
      this.width,
      this.height
    );
    this.game.ctx.restore();
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
    let elementX, elementY;
    if (element instanceof Player) {
      elementX = element.x + this.game.map.offsetX;
      elementY = element.y + this.game.map.offsetY;
    } else {
      elementX = element.x;
      elementY = element.y;
    }

    return (
      elementX + element.width / 2 >= this.x - this.width / 2 &&
      elementX - element.width / 2 <= this.x + this.width / 2 &&
      elementY + element.height / 2 >= this.y - this.height / 2 &&
      elementY - element.height / 2 <= this.y + this.height / 2
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
    if (
      Math.abs(this.game.player.x + this.game.map.offsetX - this.x) < 100 &&
      Math.abs(this.game.player.y + this.game.map.offsetY - this.y) < 100
    ) {
      console.log('bang');
      const projectile = new Projectile(
        this.game,
        this.x,
        this.y,
        this.direction
      );
      this.game.projectiles.push(projectile);
    }
  }
}
