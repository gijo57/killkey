const playerImgA = new Image();
playerImgA.src = 'images/Player1-A.png';
const playerImgB = new Image();
playerImgB.src = 'images/Player1-B.png';

class Player {
  constructor(game, x, y) {
    this.game = game;
    this.health = 100;
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 30;
    this.direction = 0;
    this.speed = 2.5 * 4;
    this.hasKey = false;
    this.weapon = new Weapon(this);
    this.frame = 0;
    this.moving = false;
  }

  draw() {
    let playerImg;
    if (this.moving) {
      if (this.frame < 15) {
        playerImg = playerImgA;
      } else {
        playerImg = playerImgB;
      }
    } else {
      playerImg = playerImgB;
    }

    this.rotate();
    this.game.ctx.drawImage(
      playerImg,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
    this.game.ctx.restore();
    this.frame++;
    this.frame %= 30;
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

    if (direction === 'forward') {
      this.moving = true;
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

  // run() {
  //   if (this.game.keyController.Shift.pressed) {
  //     this.speed = 5;
  //   }
  // }

  calculateDirection() {
    let rad = (this.direction + 90) * (Math.PI / 180);
    const x = Math.cos(rad);
    const y = Math.sin(rad);
    this.directionVector = { x, y };
  }

  shoot() {
    this.weapon.shoot();
  }
}
