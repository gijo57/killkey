class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 20;
    this.direction = 0;
    this.speed = 3;
  }

  draw() {
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  runLogic() {}

  move() {
    console.log('move');
  }

  rotate() {}
}
