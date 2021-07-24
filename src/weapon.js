class Weapon {
  constructor(owner) {
    this.owner = owner;
    this.fireRate = 500;
    this.lastShot = Date.now();
  }

  calculateEnemyAimFactor() {
    this.aimFactor = Math.random() * 2;
    this.aimFactor *= Math.round(Math.random()) ? 1 : -1;
  }

  shoot() {
    const currentShot = Date.now();

    if (currentShot - this.lastShot > this.fireRate) {
      this.owner.calculateDirection();
      const x = this.owner.x - this.owner.directionVector.x;
      const y = this.owner.y - this.owner.directionVector.y;

      let projectile;
      if (this.owner instanceof Player) {
        projectile = new Projectile(
          this.owner.game,
          this.owner,
          this.aimFactor,
          x,
          y,
          this.owner.direction
        );
      } else {
        this.calculateEnemyAimFactor();
        projectile = new Projectile(
          this.owner.game,
          this.owner,
          this.aimFactor,
          this.owner.x - this.owner.game.map.offsetX,
          this.owner.y - this.owner.game.map.offsetY,
          this.owner.direction
        );
      }

      this.owner.game.projectiles.push(projectile);
      this.lastShot = currentShot;
    }
  }
}
