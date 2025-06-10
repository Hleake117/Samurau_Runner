export default class Cloud {
  constructor(ctx, x, y, width, height, image, speed) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.speed = speed;
  }

  update(gameSpeed, frameTimeDelta, scaleRatio) {
    this.x -= this.speed * gameSpeed * frameTimeDelta * scaleRatio;
  }

  draw() {
    this.ctx.drawImage(this.image, Math.round(this.x), Math.round(this.y), this.width, this.height);
  }
} 