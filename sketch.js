let angle = -1.4;
let hue, skin, spiral;

let faceRadiusX = 60;
let faceRadiusY = 155;

function setup() {
  createCanvas(500, 800);

  colorMode(HSB);
  frameRate(22);

  // random hue color for bg
  hue = random(360);
  skin = random(360);
}

function draw() {
  background(hue, 57, 98);

  spiral = { radius: 0, radiusX: 0, radiusY: 0, angle: 0, delta: 3 };

  push();
  translate(width / 2 - 10, height / 2 + 30);
  drawSpiral();
  drawCharacter();
  pop();

  drawFrame();

  saveFrames('chapeu', 'png', 10, 22);

}

function drawFrame() {
  noFill();
  stroke(0, 0, 100);
  strokeWeight(40);
  rect(0, 0, width, height);
}

function drawSpiral() {
  noFill();
  strokeWeight(1);
  stroke(0, 0, 100);
  rotate(angle);
  beginShape();
  for (let i = 0; i < 2150; i++) {
    let noiseValX = noise(frameCount * 0.02 + i) * 1.5;
    let noiseValY = noise(frameCount * 0.05 + i) * 1.5; // offset the noise value for y to create a more dynamic movement

    let offsetX = map(noiseValX, 0, 1, -spiral.delta, spiral.delta);
    let offsetY = map(noiseValY, 0, 1, -spiral.delta, spiral.delta);

    curveVertex(
      spiral.radiusX * cos(spiral.angle) + offsetX,
      spiral.radiusY * sin(spiral.angle) + offsetY
    );

    spiral.radiusX += 0.23;
    spiral.radiusY += 0.37;
    spiral.angle += TWO_PI / 25;
    spiral.delta += 0.5 * sin(spiral.angle);
  }
  endShape();
}

function drawCharacter() {
  fill(skin, 57, 98);
  noStroke();
  ellipse(0, 0, 80, 122);
  rotate(-angle);
  rotate(angle / 10);
  fill(skin, 57, 92);
  translate(10, 5);
  stroke(0);
  strokeWeight(2);
  beginShape();
  vertex(50, 10);
  bezierVertex(0, 600, 600, 500, 300, height);
  vertex(-width * 2, height * 1.2);
  bezierVertex(200, 100, -100, 300, -40, 0);
  endShape(CLOSE);
  translate(-10, 0);
  noStroke();
  push();
  fill(skin, 57, 80);
  translate(3, 12);
  beginShape();
  for (let a = 0; a < PI + PI / 10; a += TWO_PI / 100) {
    curveVertex(faceRadiusX* .95 * cos(a), faceRadiusY * sin(a));
  }
  endShape();
  pop();  
  fill(skin, 57, 98);
  beginShape();
  for (let a = 0; a < PI + PI / 10; a += TWO_PI / 100) {
    curveVertex(faceRadiusX * cos(a), faceRadiusY * sin(a));
  }
  endShape();
  fill(0);
  noStroke();
  for (let a = 0; a < PI + PI / 15; a += TWO_PI / 1000) {
    ellipse(faceRadiusX * cos(a), faceRadiusY * sin(a), noise(a * 5) * 6);
  }

}
