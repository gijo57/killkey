class Game {
  constructor(canvas, map, tileSize) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.map = map;
    this.tileSize = tileSize;
    this.horizontalTileCount = map[0].length;
    this.verticalTileCount = map.length;
    this.running = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  start() {
    this.running = true;
    this.player = new Player(this, 300, 300);
    this.projectiles = [];
    this.enemies = [];
    this.enemies.push(new Enemy(this, 400, 400));
    this.setControls();
    this.update();
  }

  draw() {
    this.clear();
    this.drawMap();
    this.player.draw();
    this.enemies.forEach((enemy) => enemy.draw());
    this.projectiles.forEach((projectile) => projectile.draw());
  }

  drawMap() {
    this.ctx.save();
    for (let i = 0; i < this.horizontalTileCount; i++) {
      for (let j = 0; j < this.verticalTileCount; j++) {
        console.log(map[j][i]);
        if (map[j][i] === 1) {
          this.ctx.fillStyle = 'black';
        } else if (map[j][i] === 0) {
          this.ctx.fillStyle = 'grey';
        }

        this.ctx.fillRect(
          0 + i * this.tileSize.width - this.offsetX,
          0 + j * this.tileSize.height - this.offsetY,
          this.tileSize.width,
          this.tileSize.height
        );
        this.ctx.fillRect(
          0 + i * this.tileSize.width + 1 - this.offsetX,
          0 + j * this.tileSize.height + 1 - this.offsetY,
          this.tileSize.width - 1,
          this.tileSize.height - 2
        );
        // this.ctx.fillStyle = 'red';
        // this.ctx.font = '36px Arial';
        // this.ctx.fillText(
        //   i + 1 + j * this.horizontalTileCount,
        //   0 + i * this.tileSize.width + 5 - this.offsetX,
        //   0 + j * this.tileSize.height + 50 - this.offsetY
        // );
      }
    }
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
      ArrowLeft: { pressed: false, action: () => (this.player.direction -= 7) },
      ArrowRight: { pressed: false, action: () => (this.player.direction += 7) }
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
