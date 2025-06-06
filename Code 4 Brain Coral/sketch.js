let lines = [];
let colorStart, colorEnd;

function setup() {
  createCanvas(1800, 2400);
  background(0);
  strokeWeight(6);
  noiseDetail(3, 0.2);
  noFill();

  // Für Lerp Color
  colorStart = color("lightyellow");
  colorEnd = color("coral");

  for (let i = 0; i < 2000; i++) {
    let angle = random(TWO_PI);
    let radius = random(480);
    let x = width / 2 + cos(angle) * radius;
    let y = height / 2 + sin(angle) * radius;
    lines.push(new BrainLine(x, y));
  }

  noLoop();
}

function draw() {
  for (let line of lines) {
    line.update();
    line.show();
  }
}
class BrainLine {
  constructor(x, y) {
    this.points = [];
    this.x = x;
    this.y = y;
    this.maxSteps = 200;
  }

  update() {
    for (let i = 0; i < this.maxSteps; i++) {
      this.points.push([this.x, this.y]);

      let angle = noise(this.x * 0.06, this.y * 0.06) * TWO_PI * 5;
      this.x += cos(angle) * 1.5;
      this.y += sin(angle) * 1.5;

      // abbrechen - äusserer Kreis
      let dx = this.x - width / 2;
      let dy = this.y - height / 2;
      if (sqrt(dx * dx + dy * dy) > 500) {
        break;
      }
    }
  }

  show() {
    beginShape();

    for (let pt of this.points) {
      let d = dist(pt[0], pt[1], width / 2, height / 2);
      let t = constrain(d / 400, 0, 1); // Verhältnis von 0 (Mitte) bis 1 (Rand)
      let c = lerpColor(colorStart, colorEnd, t);
      stroke(c);

      curveVertex(pt[0], pt[1]);
    }

    endShape();
  }
}

function keyPressed() {
  if (key === "s" || key === "S") {
    saveCanvas("BrainCoral", "jpg");
  }
}
