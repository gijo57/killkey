class Player {
  constructor(game, x, y) {
    this.game = game;
    this.health = 100;
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 20;
    this.direction = 0;
    this.speed = 1;
  }

  draw() {
    this.rotate();
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
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
    let rad = (this.direction + 90) * (Math.PI / 180);
    const x = Math.cos(rad);
    const y = Math.sin(rad);
    this.directionVector = { x, y };

    if (direction === 'forward') {
      if (this.x < this.game.canvas.width - CAMERA_PADDING_HORIZONTAL) {
        this.x -= this.directionVector.x * this.speed;
        this.y -= this.directionVector.y * this.speed;
      } else {
        this.x = this.game.canvas.width - CAMERA_PADDING_HORIZONTAL;
        this.game.map.moveCamera();
      }

      if (this.x > CAMERA_PADDING_HORIZONTAL) {
        this.x -= this.directionVector.x * this.speed;
        this.y -= this.directionVector.y * this.speed;
      } else {
        this.x = CAMERA_PADDING_HORIZONTAL;
        this.game.map.moveCamera();
      }

      if (this.y < this.game.canvas.height - CAMERA_PADDING_VERTICAL) {
        this.x -= this.directionVector.x * this.speed;
        this.y -= this.directionVector.y * this.speed;
      } else {
        this.y = this.game.canvas.height - CAMERA_PADDING_VERTICAL;
        this.game.map.moveCamera();
      }

      if (this.y > CAMERA_PADDING_VERTICAL) {
        this.x -= this.directionVector.x * this.speed;
        this.y -= this.directionVector.y * this.speed;
      } else {
        this.y = CAMERA_PADDING_VERTICAL;
        this.game.map.moveCamera();
      }
    }

    if (direction === 'backward') {
      this.x += this.directionVector.x * this.speed;
      this.y += this.directionVector.y * this.speed;
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

  run() {
    if (this.game.keyController.Shift.pressed) {
      this.speed = 5;
    }
  }

  shoot() {
    const projectile = new Projectile(
      this.game,
      this.x + this.width,
      this.y,
      this.direction
    );
    this.game.projectiles.push(projectile);
  }
}
