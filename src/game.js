class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.running = false;
  }

  start() {
    this.running = true;
  }

  draw() {
    this.clear();
    this.drawBackground();
  }

  drawBackground() {
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  runLogic() {}

  clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  update() {
    console.log('animating');
    this.runLogic();
    this.draw();
    if (this.running) {
      window.requestAnimationFrame(() => {
        this.update();
      });
    }
  }
}
