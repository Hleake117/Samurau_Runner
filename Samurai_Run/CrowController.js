import Crow from "./Crow.js";

export default class CrowController {
  CROW_INTERVAL_MIN = 1200;
  CROW_INTERVAL_MAX = 2500;
  CROW_SCORE_THRESHOLD = 500; // Only spawn after this score
  CROW_HEIGHTS = [30, 70, 110]; // Low, mid, high (relative to canvas height)

  nextCrowInterval = null;
  crows = [];

  constructor(ctx, crowImages, scaleRatio, speed, scoreRef) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.crowImages = crowImages;
    this.scaleRatio = scaleRatio;
    this.speed = speed;
    this.scoreRef = scoreRef; // Reference to Score instance
    this.setNextCrowTime();
  }

  setNextCrowTime() {
    const num = this.getRandomNumber(
      this.CROW_INTERVAL_MIN,
      this.CROW_INTERVAL_MAX
    );
    this.nextCrowInterval = num;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  createCrow() {
    const heightIndex = this.getRandomNumber(0, this.CROW_HEIGHTS.length - 1);
    const y = this.CROW_HEIGHTS[heightIndex] * this.scaleRatio;
    const width = 48 * this.scaleRatio;
    const height = 48 * this.scaleRatio;
    const x = this.canvas.width * 1.5;
    const crow = new Crow(
      this.ctx,
      x,
      y,
      width,
      height,
      this.crowImages,
      this.speed
    );
    this.crows.push(crow);
  }

  update(gameSpeed, frameTimeDelta) {
    if (this.scoreRef.score >= this.CROW_SCORE_THRESHOLD) {
      if (this.nextCrowInterval <= 0) {
        this.createCrow();
        this.setNextCrowTime();
      }
      this.nextCrowInterval -= frameTimeDelta;
    }
    this.crows.forEach((crow) => {
      crow.update(gameSpeed, frameTimeDelta, this.scaleRatio);
    });
    this.crows = this.crows.filter((crow) => crow.x > -crow.width);
  }

  draw() {
    this.crows.forEach((crow) => crow.draw());
  }

  collideWith(sprite) {
    return this.crows.some((crow) => crow.collideWith(sprite));
  }

  reset() {
    this.crows = [];
  }
} 