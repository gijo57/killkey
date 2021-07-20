const keyImage = new Image();
keyImage.src = 'images/key.png';

class Key {
  constructor(game) {
    this.game = game;
    this.width = 20;
    this.height = 40;
  }

  draw() {
    this.game.ctx.save();
    this.game.ctx.drawImage(
      keyImage,
      0,
      0,
      30,
      65,
      this.game.keyLocation.x,
      this.game.keyLocation.y,
      this.width,
      this.height
    );
    this.game.ctx.restore();
  }

  isPicked(element) {
    return (
      element.x + element.width / 2 >=
        this.game.keyLocation.x - this.width / 2 &&
      element.x - element.width / 2 <=
        this.game.keyLocation.x + this.width / 2 &&
      element.y + element.height / 2 >=
        this.game.keyLocation.y - this.height / 2 &&
      element.y - element.height / 2 <=
        this.game.keyLocation.y + this.height / 2
    );
  }
}
