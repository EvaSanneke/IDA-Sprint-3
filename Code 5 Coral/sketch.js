let branchLength = 150;
let colorStart, colorEnd;

function setup() {
  createCanvas(1800, 2400);
  angleMode(DEGREES);
  background(0);

  colorStart = color("lightgreen");
  colorEnd = color("cyan");

  strokeWeight(5);

  let angles = [
    10, 30, 60, 90, 120, 150, 170, 180, -10, -30, -60, -90, -120, -150, -170,
    -180,
  ];
  for (let angle of angles) {
    coral(width / 2, height / 2, branchLength, angle, 0);
  }
}

function coral(x, y, len, angle, t) {
  // Clamp t to [0, 1]
  let tt = constrain(t, 0, 1);
  stroke(lerpColor(colorStart, colorEnd, tt));

  let endX = x + cos(angle) * len * 1.2;
  let endY = y + sin(angle) * len * 1.2;
  line(x, y, endX, endY);

  if (len > 5) {
    let newAngle1 = angle + random(-30, 30);
    let newLen1 = len * random(0.5, 0.8);
    coral(endX, endY, newLen1, newAngle1, t + 0.1);

    let newAngle2 = angle + random(-30, 30);
    let newLen2 = len * random(0.5, 0.8);
    coral(endX, endY, newLen2, newAngle2, t + 0.2);
  }
}

function keyPressed() {
  if (key === "s" || key === "S") {
    saveCanvas("Koralle 3", "jpg");
  }
}
