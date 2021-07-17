class Player {
  constructor(game, x, y) {
    this.game = game;
    this.health = 100;
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 20;
    this.direction = 0;
    this.speed = 2.5;
    this.hasKey = false;
  }

  draw() {
    this.rotate();
    this.game.ctx.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
    this.game.ctx.restore();
  }

  collide(element) {
    return (
      element.x + element.width / 2 >= this.x - this.width / 2 &&
      element.x - element.width / 2 <= this.x + this.width / 2 &&
      element.y + element.height / 2 >= this.y - this.height / 2 &&
      element.y - element.height / 2 <= this.y + this.height / 2
    );
  }

  move(direction) {
    this.calculateDirection();
    this.game.map.collide(this);

    if (direction === 'forward') {
      if (this.x >= this.game.canvas.width - CAMERA_PADDING_HORIZONTAL) {
        this.x = this.game.canvas.width - CAMERA_PADDING_HORIZONTAL;
        this.game.map.moveCamera();
      } else if (this.x <= CAMERA_PADDING_HORIZONTAL) {
        this.x = CAMERA_PADDING_HORIZONTAL;
        this.game.map.moveCamera();
      } else if (this.y >= this.game.canvas.height - CAMERA_PADDING_VERTICAL) {
        this.y = this.game.canvas.height - CAMERA_PADDING_VERTICAL;
        this.game.map.moveCamera();
      } else if (this.y <= CAMERA_PADDING_VERTICAL) {
        this.y = CAMERA_PADDING_VERTICAL;
        this.game.map.moveCamera();
      } else {
        this.x -= this.directionVector.x * this.speed;
        this.y -= this.directionVector.y * this.speed;
      }
    }
  }

  rotate() {
    this.direction %= 360;
    this.game.ctx.save();
    let rad = (this.direction * Math.PI) / 180;
    this.game.ctx.translate(this.x, this.y);
    this.game.ctx.rotate(rad);
    this.game.ctx.translate(-this.x, -this.y);
  }

  run() {
    if (this.game.keyController.Shift.pressed) {
      this.speed = 5;
    }
  }

  calculateDirection() {
    let rad = (this.direction + 90) * (Math.PI / 180);
    const x = Math.cos(rad);
    const y = Math.sin(rad);
    this.directionVector = { x, y };
  }

  shoot() {
    this.calculateDirection();
    const x = this.x - this.directionVector.x * 5;
    const y = this.y - this.directionVector.y * 5;
    const projectile = new Projectile(this.game, x, y, this.direction);
    this.game.projectiles.push(projectile);
  }
}
