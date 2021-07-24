const enemyImgA = new Image();
enemyImgA.src = 'images/Player2-A.png';
const enemyImgB = new Image();
enemyImgB.src = 'images/Player2-B.png';
const bloodImg = new Image();
bloodImg.src = 'images/blood.png';

class Enemy {
  constructor(game, x, y) {
    this.game = game;
    this.health = 50;
    this.startPosition = { x, y };
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 30;
    this.direction = 0;
    this.speed = 2;
    this.dead = false;
    this.weapon = new Weapon(this);
    this.walk = false;
    this.maxDistance = 250;
    this.returnToStart = false;
    this.frame = 0;
  }

  draw() {
    let enemyImg;

    if (!this.dead) {
      if (this.walk && this.distance < this.maxDistance) {
        if (this.frame < 15) {
          enemyImg = enemyImgA;
        } else {
          enemyImg = enemyImgB;
        }
      } else {
        enemyImg = enemyImgB;
      }
      this.rotate();
    } else {
      enemyImg = bloodImg;
    }

    this.game.ctx.drawImage(
      enemyImg,
      this.x - this.width / 2 - this.game.map.offsetX,
      this.y - this.height / 2 - this.game.map.offsetY,
      this.width,
      this.height
    );
    this.game.ctx.restore();
    this.frame++;
    this.frame %= 30;
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

    if (
      Math.abs(this.x - this.startPosition.x) < 5 &&
      Math.abs(this.y === this.startPosition.y) < 5
    ) {
      this.walk = false;
      this.returnToStart = false;
    }

    if (this.playerDistance < 250) {
      this.walk = true;
      this.returnToStart = false;
    }

    if (this.playerDistance < 100) {
      this.walk = false;
    }

    if (this.walk) {
      if (
        (!this.game.map.collide(this) && this.distance < this.maxDistance) ||
        this.returnToStart
      ) {
        this.calculateDirection();
        this.x = this.x - this.directionVector.x * this.speed;
        this.y = this.y - this.directionVector.y * this.speed;
      }
    }

    if (
      (this.playerDistance > 250 && this.distance >= this.maxDistance) ||
      this.game.map.collide(this)
    ) {
      this.returnToStart = true;
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
    if (!this.returnToStart) {
      this.direction =
        (Math.atan2(
          this.game.player.y + this.game.map.offsetY - this.y,
          this.game.player.x + this.game.map.offsetX - this.x
        ) *
          180) /
          Math.PI +
        90;
    } else {
      this.direction =
        (Math.atan2(
          this.startPosition.y - this.y,
          this.startPosition.x - this.x
        ) *
          180) /
          Math.PI +
        90;
    }

    this.direction %= 360;

    this.game.ctx.save();
    let rad = (this.direction * Math.PI) / 180;
    this.game.ctx.translate(
      this.x - this.game.map.offsetX,
      this.y - this.game.map.offsetY
    );
    this.game.ctx.rotate(rad);
    this.game.ctx.translate(
      -this.x + this.game.map.offsetX,
      -this.y + this.game.map.offsetY
    );
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
    if (!this.returnToStart) {
      if (this.playerDistance < 300) {
        this.weapon.shoot();
      }
    }
  }
}
