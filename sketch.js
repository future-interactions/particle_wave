let yoff = 0;
let ballSizeSlider, ballSpacingSlider, waveSizeSlider, waveHeightSlider, numbersCheckBox, particlesCheckBox, connectorsCheckBox;
let SaveButton;
let backgroundAlpha = 0;
let currenty, lasty;
let numbers, connectors;
let particles = true;
let DMSans;
function preload() {
  DMSans = loadFont('assets/DMSans-Medium.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  fill(255);
  noStroke();
  textFont(DMSans);
  drawInterface();
}

function draw() {
  if (mouseY > 50) {
    orbitControl(true);
  } else {
    orbitControl(false);
  }
  background(20, 43, 57, backgroundAlpha);
  let ballSize = ballSizeSlider.value();
  let spacing = ballSpacingSlider.value();
  let numOfBalls = (width) / (ballSize + spacing);

  for (let i = 0; i < numOfBalls; i++) {
    for (let j = 0; j < numOfBalls; j++) {
      push();
      lasty = noise(yoff + ((i - 1) / 10) + (j / waveSizeSlider.value()));
      currenty = noise(yoff + (i / 10) + (j / waveSizeSlider.value()));
      translate(-width * 0.5, -waveHeightSlider.value() / 2, -j * (spacing + ballSize));
      fill(255, 255, 255, map(currenty, 0.5, 0.6, 200, 255));

      //numbers
      if (numbers) {
        text(i + int(j * numOfBalls), i * (spacing + ballSize), currenty * waveHeightSlider.value() - 20);
      }
      //particles
      if (particles) {
      ellipse(i * (spacing + ballSize), currenty * waveHeightSlider.value(), ballSize, ballSize);
      }

      if (i > 0 && connectors) {
        stroke(255, map(currenty, 0.5, 0.6, 200, 255));
        line(i * (spacing + ballSize), currenty * waveHeightSlider.value(), (i - 1) * (spacing + ballSize), lasty * waveHeightSlider.value());
      }
      pop();
    }
  }

  yoff += speedSlider.value() / 250;

  lights();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function saveImage() {
  saveCanvas('perlin_wave', 'png');
}



function drawInterface() {

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

  particlesCheckBox = createCheckbox();
  particlesCheckBox.checked(true);
  particlesCheckBox.position(12, 70);
  particlesCheckBox.changed(myCheckedEvent);

  let particleText = createElement('desc', 'Show particles');
  particleText.style('color', '#ffffff');
  particleText.position(36, 69.5);

  numbersCheckBox = createCheckbox('label', false);
  numbersCheckBox.position(204, 70);
  numbersCheckBox.changed(myCheckedEvent);

  let numbersText = createElement('desc', 'Show numbers');
  numbersText.style('color', '#ffffff');
  numbersText.position(228, 70);

  connectorsCheckBox = createCheckbox('label', false);
  connectorsCheckBox.position(394, 70);
  connectorsCheckBox.changed(myCheckedEvent);

  let connectorsText = createElement('desc', 'Show connectors');
  connectorsText.style('color', '#ffffff');
  connectorsText.position(418, 70);
}

function myCheckedEvent() {
  if (numbersCheckBox.checked()) {
    numbers = true;
  } else {
    numbers = false;
  }

  if (particlesCheckBox.checked()) {
    particles = true;
  } else {
    particles = false;
  }

  if (connectorsCheckBox.checked()) {
    connectors = true;
  } else {
    connectors = false;
  }
}