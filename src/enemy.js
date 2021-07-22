class Enemy {
  constructor(game, x, y) {
    this.game = game;
    this.health = 50;
    this.startPosition = { x, y };
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 20;
    this.direction = 0;
    this.speed = 1;
    this.dead = false;
    this.weapon = new Weapon(this);
    this.walk = false;
    this.maxDistance = 300;
  }

  draw() {
    // console.log('e', this.x, this.y);
    this.rotate();
    this.game.ctx.fillRect(
      this.x - this.width / 2 - this.game.map.offsetX,
      this.y - this.height / 2 - this.game.map.offsetY,
      this.width,
      this.height
    );
    this.game.ctx.restore();
  }

  move() {
    this.playerDistance = this.calculateDistance(
      this.x,
      this.game.player.x + this.game.map.offsetX,
      this.y,
      this.game.player.y + this.game.map.offsetY
    );
    this.distance = this.calculateDistance(
      this.x,
      this.startPosition.x,
      this.y,
      this.startPosition.y
    );

    if (this.playerDistance < 400) {
      this.walk = true;
    }

    if (this.walk && this.distance < this.maxDistance) {
      this.calculateDirection();

      if (!this.game.map.collide(this)) {
        this.x = this.x - this.directionVector.x * this.speed;
        this.y = this.y - this.directionVector.y * this.speed;
      }
    }
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
    this.game.ctx.translate(this.x, this.y);
    this.game.ctx.rotate(rad);
    this.game.ctx.translate(-this.x, -this.y);
    this.game.ctx.restore();
  }

  calculateDistance(x, refX, y, refY) {
    const a = x - refX;
    const b = y - refY;
    return Math.sqrt(a * a + b * b);
  }

  calculateDirection() {
    let rad = (this.direction + 90) * (Math.PI / 180);
    const x = Math.cos(rad);
    const y = Math.sin(rad);
    this.directionVector = { x, y };
  }

  shoot() {
    if (
      Math.abs(this.game.player.x + this.game.map.offsetX - this.x) < 300 &&
      Math.abs(this.game.player.y + this.game.map.offsetY - this.y) < 300
    ) {
      this.weapon.shoot();
    }
  }
}
