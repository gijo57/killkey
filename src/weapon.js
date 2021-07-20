class Weapon {
  constructor(owner) {
    this.owner = owner;
    this.fireRate = 10;
  }

  shoot() {
    this.owner.calculateDirection();
    const x = this.owner.x - this.owner.directionVector.x * 20;
    const y = this.owner.y - this.owner.directionVector.y * 20;
    const projectile = new Projectile(
      this.owner.game,
      x,
      y,
      this.owner.direction
    );
    this.owner.game.projectiles.push(projectile);
  }
}
