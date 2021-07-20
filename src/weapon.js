class Weapon {
  constructor(owner) {
    this.owner = owner;
    this.fireRate = 500;
    this.lastShot = Date.now();
  }

  shoot() {
    const currentShot = Date.now();

    if (currentShot - this.lastShot > this.fireRate) {
      this.owner.calculateDirection();
      const x = this.owner.x - this.owner.directionVector.x * 20;
      const y = this.owner.y - this.owner.directionVector.y * 20;

      let projectile;
      if (this.owner instanceof Player) {
        projectile = new Projectile(
          this.owner.game,
          x,
          y,
          this.owner.direction
        );
      } else {
        projectile = new Projectile(
          this.owner.game,
          this.owner.x -
            this.owner.game.map.offsetX -
            this.owner.directionVector.x * 5,
          this.owner.y -
            this.owner.game.map.offsetY -
            this.owner.directionVector.y * 5,
          this.owner.direction
        );
      }

      this.owner.game.projectiles.push(projectile);
      this.lastShot = currentShot;
    }
  }
}
