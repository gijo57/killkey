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
    this.setControls();
    this.update();
  }

  draw() {
    this.clear();
    //this.drawBackground();
    this.player.draw();
    this.projectiles.forEach((projectile) => projectile.draw());
  }

  drawBackground() {
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  runLogic() {
    Object.keys(this.keyController).forEach((key) => {
      this.keyController[key].pressed && this.keyController[key].action();
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.projectiles.forEach((projectile) => projectile.runLogic());
  }

  setControls() {
    this.keyController = {
      Space: { action: () => this.player.shoot() },
      ArrowUp: { pressed: false, action: () => this.player.move('forward') },
      ArrowDown: { pressed: false, action: () => this.player.move('backward') },
      ArrowLeft: { pressed: false, action: () => (this.player.direction -= 4) },
      ArrowRight: { pressed: false, action: () => (this.player.direction += 4) }
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
