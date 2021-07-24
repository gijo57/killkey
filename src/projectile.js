class Projectile {
  constructor(game, owner, aimFactor, x, y, direction) {
    this.owner = owner;
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 3;
    this.height = 5;
    this.direction = direction;
    this.speed = 10;
    this.aimFactor = aimFactor;
  }

  draw() {
    this.game.ctx.save();
    this.rotate();
    this.game.ctx.fillStyle = 'grey';
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.game.ctx.restore();
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
      elementX + element.width / 2 >=
        this.x + this.game.map.offsetX - this.width / 2 &&
      elementX - element.width / 2 <=
        this.x + this.game.map.offsetX + this.width / 2 &&
      elementY + element.height / 2 >=
        this.y + this.game.map.offsetY - this.height / 2 &&
      elementY - element.height / 2 <=
        this.y + this.game.map.offsetY + this.height / 2
    );
  }

  rotate() {
    this.direction %= 360;

    this.game.ctx.save();
    let rad = (this.direction * Math.PI) / 180;
    this.game.ctx.translate(this.x, this.y);
    this.game.ctx.rotate(rad);
    this.game.ctx.translate(-this.x, -this.y);
  }

  calculateDirection() {
    let rad = (this.direction + 90) * (Math.PI / 180);

    const x = Math.cos(rad);
    const y = Math.sin(rad);

    this.directionVector = { x, y };
  }

  runLogic() {
    this.calculateDirection();
    if (this.owner instanceof Enemy) {
      this.x = this.x - this.directionVector.x * this.speed + this.aimFactor;
      this.y = this.y - this.directionVector.y * this.speed + this.aimFactor;
    } else {
      this.x = this.x - this.directionVector.x * this.speed;
      this.y = this.y - this.directionVector.y * this.speed;
    }
  }
}
