export default class Crow {
  ANIMATION_TIMER = 150;
  animationTimer = this.ANIMATION_TIMER;
  currentFrame = 0;

  constructor(ctx, x, y, width, height, images, speed) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.images = images; // [frame1, frame2]
    this.speed = speed;
    this.image = this.images[0];
  }

  update(gameSpeed, frameTimeDelta, scaleRatio) {
    this.x -= this.speed * gameSpeed * frameTimeDelta * scaleRatio;
    this.animate(frameTimeDelta);
  }

  animate(frameTimeDelta) {
    this.animationTimer -= frameTimeDelta;
    if (this.animationTimer <= 0) {
      this.currentFrame = (this.currentFrame + 1) % this.images.length;
      this.image = this.images[this.currentFrame];
      this.animationTimer = this.ANIMATION_TIMER;
    }
  }

  draw() {
    this.ctx.drawImage(this.image, Math.round(this.x), Math.round(this.y), this.width, this.height);
  }

  collideWith(sprite) {
    // Shrink hitbox by 40% on all sides (60% of original size)
    const hitboxPaddingX = this.width * 0.2;
    const hitboxPaddingY = this.height * 0.2;
    const hitboxX = this.x + hitboxPaddingX * 2;
    const hitboxY = this.y + hitboxPaddingY * 2;
    const hitboxWidth = this.width - 4 * hitboxPaddingX;
    const hitboxHeight = this.height - 4 * hitboxPaddingY;
    return (
      sprite.x < hitboxX + hitboxWidth &&
      sprite.x + sprite.width > hitboxX &&
      sprite.y < hitboxY + hitboxHeight &&
      sprite.y + sprite.height > hitboxY
    );
  }
} 