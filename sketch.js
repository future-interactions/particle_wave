let xoff = 0;
let ballSizeSlider;
let ballSpacingSlider;
let SaveButton;

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

  waveSizeSlider = createSlider(1, 100, 30);
  waveSizeSlider.position(590, 16);
  waveSizeSlider.style('width', '160px');

  waveHeightSlider = createSlider(100, 2000, 300);
  waveHeightSlider.position(790, 16);
  waveHeightSlider.style('width', '160px');

  let ballSizeText = createElement('desc', 'Particle Size');
  ballSizeText.style('color', '#ffffff');
  ballSizeText.position(16, 36);

  let ballSpacingText = createElement('desc', 'Particle Spacing');
  ballSpacingText.style('color', '#ffffff');
  ballSpacingText.position(208, 36);

  let speedText = createElement('desc', 'Wave Speed');
  speedText.style('color', '#ffffff');
  speedText.position(398, 36);

  let waveSizeText = createElement('desc', 'Wave Size');
  waveSizeText.style('color', '#ffffff');
  waveSizeText.position(598, 36);

  let waveHeightText = createElement('desc', 'Wave Height');
  waveHeightText.style('color', '#ffffff');
  waveHeightText.position(798, 36);

  SaveButton = createButton('Save');
  SaveButton.position(990, 16);
  SaveButton.mousePressed(saveImage);
  colorMode(RGB);
}

function draw() {
  if (mouseY > 50) {
    orbitControl(true);
  } else {
    orbitControl(false);
  }
  background(20, 43, 57);
  let ballSize = ballSizeSlider.value();
  let spacing = ballSpacingSlider.value();
  let numOfBalls = (width * 2) / (ballSize + spacing);
  for (let i = 0; i < numOfBalls; i++) {
    for (let j = 0; j < numOfBalls; j++) {
      push();
      let x = noise(xoff + (i / 10) + (j / waveSizeSlider.value()));
      translate(-width * 0.75, -waveHeightSlider.value() / 2, -j * (spacing + ballSize));
      fill(255, 255, 255, map(x, 0.5, 0.6, 200, 255));
      ellipse(i * (spacing + ballSize), x * waveHeightSlider.value(), ballSize, ballSize);

      pop();
    }
  }
  xoff += speedSlider.value() / 250;
  lights();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function saveImage() {
    saveCanvas('myCanvas', 'jpg');
}
