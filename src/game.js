class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.running = false;
    this.keyLocation = {};
  }

  start() {
    this.running = true;
    this.player = new Player(
      this,
      CAMERA_PADDING_HORIZONTAL + 100,
      CAMERA_PADDING_VERTICAL + 1
    );
    this.map = new Map(this);
    this.key = new Key(this);
    this.projectiles = [];
    this.enemies = [];
    this.enemies.push(new Enemy(this, 400, 400));
    this.setControls();
    this.update();
  }

  draw() {
    this.clear();
    this.map.draw();
    if (!this.player.hasKey) {
      this.key.draw();
    }
    this.player.draw();
    this.enemies.forEach((enemy) => enemy.draw());
    this.projectiles.forEach((projectile) => projectile.draw());
  }

  runLogic() {
    Object.keys(this.keyController).forEach((key) => {
      this.keyController[key].pressed && this.keyController[key].action();
    });
    this.enemies.forEach((enemy) => {
      if (!enemy.dead) {
        enemy.move();
        //enemy.shoot();
      }
    });
    this.projectiles.forEach((projectile) => projectile.runLogic());
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
      ArrowLeft: { pressed: false, action: () => (this.player.direction -= 5) },
      ArrowRight: { pressed: false, action: () => (this.player.direction += 5) }
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
    if (this.key.isPicked(this.player)) {
      this.player.hasKey = true;
    }

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
        if (projectile.collide(this.player)) {
          this.projectiles.splice(projectileIndex, 1);
          //this.player.health -= 5;
          if (this.player.health <= 0) {
            this.gameOver();
          }
        }
        if (this.map.collide(projectile)) {
          this.projectiles.splice(projectileIndex, 1);
        }
      });
    });
  }

  gameOver() {
    this.running = false;
    console.log('GAME OVER!');
  }

  passLevel() {
    this.running = false;
    console.log('PASS LEVEL!');
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
