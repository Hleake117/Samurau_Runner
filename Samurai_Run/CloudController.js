import Cloud from "./Cloud.js";

export default class CloudController {
  CLOUD_INTERVAL_MIN = 2000;
  CLOUD_INTERVAL_MAX = 6000;
  CLOUD_HEIGHTS = [20, 40, 60, 80]; // Possible y positions for clouds
  CLOUD_SPEED_FACTOR = 0.18; // Clouds move at 0.18x ground speed (slower)

  nextCloudInterval = null;
  clouds = [];

  constructor(ctx, cloudImage, scaleRatio, speed, canvasWidth) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.cloudImage = cloudImage;
    this.scaleRatio = scaleRatio;
    this.speed = speed;
    this.canvasWidth = canvasWidth;
    this.setNextCloudTime();
  }

  setNextCloudTime() {
    const num = this.getRandomNumber(
      this.CLOUD_INTERVAL_MIN,
      this.CLOUD_INTERVAL_MAX
    );
    this.nextCloudInterval = num;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  createCloud() {
    const heightIndex = this.getRandomNumber(0, this.CLOUD_HEIGHTS.length - 1);
    const y = this.CLOUD_HEIGHTS[heightIndex] * this.scaleRatio;
    const width = 64 * this.scaleRatio;
    const height = 16 * this.scaleRatio;
    const x = this.canvasWidth;
    const cloud = new Cloud(
      this.ctx,
      x,
      y,
      width,
      height,
      this.cloudImage,
      this.speed * this.CLOUD_SPEED_FACTOR
    );
    this.clouds.push(cloud);
  }

  update(gameSpeed, frameTimeDelta) {
    if (this.nextCloudInterval <= 0) {
      this.createCloud();
      this.setNextCloudTime();
    }
    this.nextCloudInterval -= frameTimeDelta;
    this.clouds.forEach((cloud) => {
      cloud.update(gameSpeed, frameTimeDelta, this.scaleRatio);
    });
    this.clouds = this.clouds.filter((cloud) => cloud.x > -cloud.width);
  }

  draw() {
    this.clouds.forEach((cloud) => cloud.draw());
  }

  reset() {
    this.clouds = [];
  }
} 