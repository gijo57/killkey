class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.running = false;
  }

  start() {
    this.running = true;
    this.player = new Player(this, 100, 100);
    this.projectiles = [];
    this.enemies = [];
    this.enemies.push(new Enemy(this, 400, 400));
    this.setControls();
    this.update();
  }

  draw() {
    this.clear();
    this.drawBackground();
    this.player.draw();
    this.enemies.forEach((enemy) => enemy.draw());
    this.projectiles.forEach((projectile) => projectile.draw());
  }

  drawBackground() {
    this.ctx.save();
    this.ctx.fillStyle = 'lightgrey';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.ctx.restore();
  }

  runLogic() {
    Object.keys(this.keyController).forEach((key) => {
      this.keyController[key].pressed && this.keyController[key].action();
    });
    this.projectiles.forEach((projectile) => projectile.runLogic());
    this.enemies.forEach((enemy) => {
      if (!enemy.dead) {
        enemy.move();
      }
    });
    this.checkCollisions();
  }

  clear() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  setControls() {
    this.keyController = {
      Shift: { pressed: false, action: () => this.player.run() },
      Space: { action: () => this.player.shoot() },
      ArrowUp: { pressed: false, action: () => this.player.move('forward') },
      ArrowDown: { pressed: false, action: () => this.player.move('backward') },
      ArrowLeft: { pressed: false, action: () => (this.player.direction -= 3) },
      ArrowRight: { pressed: false, action: () => (this.player.direction += 3) }
    };

    window.addEventListener('keydown', (e) => {
      e.preventDefault();
      let key = e.key;
      if (key === ' ') {
        key = 'Space';
      }
      if (this.keyController[key]) {
        this.keyController[key].pressed = true;
      }
    });

    window.addEventListener('keyup', (e) => {
      e.preventDefault();
      let key = e.key;
      if (key === ' ') {
        key = 'Space';
      }
      if (this.keyController[key]) {
        this.keyController[key].pressed = false;
      }
    });
  }

  checkCollisions() {
    this.enemies.forEach((enemy) => {
      if (enemy.collide(this.player)) {
        if (!enemy.dead) {
          enemy.health -= 1;
          if (enemy.health <= 0) {
            enemy.die();
          }
          this.player.health -= 1;
          if (this.player.health <= 0) {
            this.gameOver();
          }
        }
      }

      this.projectiles.forEach((projectile, projectileIndex) => {
        if (projectile.collide(enemy)) {
          if (!enemy.dead) {
            this.projectiles.splice(projectileIndex, 1);
            enemy.health -= 5;
            if (enemy.health <= 0) {
              enemy.die();
            }
          }
        }
      });
    });
  }

  gameOver() {
    this.running = false;
    console.log('GAME OVER!');
  }

  update() {
    this.runLogic();
    this.draw();
    if (this.running) {
      window.requestAnimationFrame(() => {
        this.update();
      });
    }
  }
}
