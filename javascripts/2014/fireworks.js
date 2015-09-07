'use strict';

class Fireworks {
  constructor(id) {
    this.initCanvas(id);
    this.settings = {
      gravity: 0.2,
      damping: 0.95,
      sparkSize: 3,
      sparkQuantity: 1500
    };
    this.fire();
  }

  initCanvas(selector) {
    this.canvas = document.getElementById(selector);
    this.canvas.width  = 500;
    this.canvas.height = 500;
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = '#000000';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  initSparks() {
    let x = this.canvas.width / 2;
    let y = this.canvas.height / 2;
    for (let i = 0; i < this.settings.sparkQuantity; i++) {
      let angle = Math.random() * (Math.PI * 2);
      let speed = Math.random() * 6;
      this.sparks.push({x: x,  y: y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed});
    }
  }

  update() {
    for (let spark of this.sparks) {
      spark.x += spark.vx;
      spark.y += spark.vy + this.settings.gravity;
      spark.vx *= this.settings.damping;
      spark.vy *= this.settings.damping;
      this.draw(spark);
    }
    this.context.globalCompositeOperation = 'source-over';
    this.context.fillStyle = 'rgba(0, 0, 0, 0.3)';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.sparkSize *= 0.97;
    if (this.sparkSize < 0.03) {
      this.fire();
      return;
    }
    requestAnimationFrame(this.update.bind(this));
  }

  fire() {
    this.sparkSize = this.settings.sparkSize;
    this.sparks = [];
    this.initSparks();
    requestAnimationFrame(this.update.bind(this));
  }

  draw(spark) {
    this.context.fillStyle = '#723057';
    this.context.globalCompositeOperation = 'lighter';
    this.context.beginPath();
    this.context.arc(spark.x, spark.y, this.sparkSize, 0, Math.PI * 2, true);
    this.context.fill();
  }
}
