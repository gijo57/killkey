class Projectile {
  constructor(game, owner, x, y, direction) {
    this.owner = owner;
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 3;
    this.height = 3;
    this.direction = direction;
    this.speed = 10;
  }

  draw() {
    this.game.ctx.save();
    this.game.ctx.fillStyle = 'red';
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

  runLogic() {
    let rad = (this.direction + 90) * (Math.PI / 180);
    const x = Math.cos(rad);
    const y = Math.sin(rad);

    this.x -= x * this.speed;
    this.y -= y * this.speed;
  }
}
