let xoff = 0;
let ballSizeSlider;
let ballSpacingSlider;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  fill(255);
  noStroke();
  ballSizeSlider = createSlider(2, 100, 10);
  ballSizeSlider.position(10, 16);
  ballSizeSlider.style('width', '160px');

  ballSpacingSlider = createSlider(15, 100, 20);
  ballSpacingSlider.position(200, 16);
  ballSpacingSlider.style('width', '160px');

speedSlider = createSlider(1, 10, 5);
  speedSlider.position(390, 16);
  speedSlider.style('width', '160px');

 heightSlider = createSlider(1, 100, 30);
  heightSlider.position(590, 16);
  heightSlider.style('width', '160px');

  let ballSizeText = createElement('desc', 'Particle Size');
  ballSizeText.style('color', '#ffffff');
  ballSizeText.position(16, 36);

  let ballSpacingText = createElement('desc', 'Particle Spacing');
  ballSpacingText.style('color', '#ffffff');
  ballSpacingText.position(208, 36);

  let speedText = createElement('desc', 'Wave Speed');
  speedText.style('color', '#ffffff');
  speedText.position(398, 36);

  let heightText = createElement('desc', 'Wave Size');
  heightText.style('color', '#ffffff');
  heightText.position(598, 36);

}

function draw() {
  if (mouseY > 50) {
    orbitControl(true);
  } else {
    orbitControl(false);
  }
  background(0);


  let ballSize = ballSizeSlider.value();
  let spacing = ballSpacingSlider.value();
  let numOfBalls = width / (ballSize + spacing);
  for (let i = 0; i < numOfBalls; i++) {
    for (let j = 0; j < numOfBalls; j++) {

      push();
      let x = noise(xoff + (i / 10) + (j /heightSlider.value()));
      translate(-width / 2, 0, -j * (spacing + ballSize));
      ellipse(i * (spacing + ballSize), x * 100, ballSize, ballSize);
      pop();
    }
  }
  xoff += speedSlider.value()/250;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}