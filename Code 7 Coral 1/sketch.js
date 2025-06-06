function setup() {
  createCanvas(1800, 2400);
  angleMode(DEGREES);
  noLoop();
  background(0);
  translate(width / 2, height / 2);

  let numBranches = 80;
  for (let i = 0; i < numBranches; i++) {
    push();
    rotate((360 / numBranches) * i);
    branch(80, 0);
    pop();
  }
}

function branch(len, depth) {
  // Gradient endpoints
  let c1 = color("coral");
  let c2 = color("steelblue");

  let maxDepth = 8;
  let t = constrain(depth / maxDepth, 0, 1);

  // Single-step color interpolation
  let blended = lerpColor(c1, c2, t);
  stroke(blended);

  strokeWeight(map(len, 10, 80, 1, 10));

  if (len > 8) {
    line(0, 0, 0, -len);
    translate(0, -len);

    push();
    rotate(random(15, 30));
    branch(len * random(0.7, 0.9), depth + 1);
    pop();

    push();
    rotate(random(-15, -20));
    branch(len * random(0.7, 0.9), depth + 1);
    pop();
  }
}

function keyPressed() {
  if (key === "s" || key === "S") {
    saveCanvas("Coral1", "jpg");
  }
}
