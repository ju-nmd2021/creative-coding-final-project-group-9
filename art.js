let colors = [];
let numbers = [];
let gridSize = 5;
let boxSize;
let selectedColors = [];

function setup() {
  createCanvas(600, 600);
  boxSize = width / gridSize;
  noLoop();
  generateRandomColorsAndNumbers();
  displayColorGrid();
}

function generateRandomColorsAndNumbers() {
  colors = [];
  numbers = [];
  for (let i = 0; i < gridSize * (gridSize - 1); i++) {
    colors.push(color(random(255), random(255), random(255), 210));
    numbers.push(floor(random(3, 24)));
  }
}
function displayColorGrid() {
  for (let row = 0; row < gridSize - 1; row++) {
    for (let col = 0; col < gridSize; col++) {
      let index = row * gridSize + col;
      let boxX = col * boxSize;
      let boxY = row * boxSize;

      // Highlights selected boxes with a black border
      if (selectedColors.includes(index)) {
        stroke(0);
        strokeWeight(2);
        fill(colors[index]);
        rect(boxX, boxY, boxSize, boxSize);
      } else {
        noStroke();
        fill(colors[index]);
        rect(boxX, boxY, boxSize, boxSize);
      }
    }
  }
}

function mousePressed() {
  let col = floor(mouseX / boxSize);
  let row = floor(mouseY / boxSize);
  let index = row * gridSize + col;

  if (col >= 0 && col < gridSize && row >= 0 && row < gridSize - 1) {
    if (selectedColors.includes(index)) {
      selectedColors.splice(selectedColors.indexOf(index), 1);
    } else {
      selectedColors.push(index);
    }
    displayColorGrid();
  }
}

function generateArt() {
  // Clear the canvas
  background(255);

  // Sort selected colors by their brightness
  selectedColors.sort((a, b) => brightness(colors[a]) - brightness(colors[b])); // Got help from chatgpt

  // Calculate center of the canvas
  let centerX = width / 2;
  let centerY = height / 2;

  // Draw concentric circles, rectangles, and lines
  for (let i = 0; i < selectedColors.length; i++) {
    let index = selectedColors[i];
    let colorValue = colors[index];
    let size = i * 20 + 40; // Varying size for each element, got help from chatgpt

    // Draw different shapes based on the number value
    if (numbers[index] % 4 === 0) {
      // Draw a circle
      fill(colorValue);
      ellipse(centerX, centerY, size * 2, size * 2);
    } else if (numbers[index] % 4 === 1) {
      // Draw a rectangle
      fill(colorValue);
      rect(centerX - size, centerY - size, size * 2, size * 2);
    } else if (numbers[index] % 4 === 2) {
      // Draw diagonal lines
      stroke(colorValue);
      strokeWeight(2);
      line(centerX - size, centerY - size, centerX + size, centerY + size);
      line(centerX - size, centerY + size, centerX + size, centerY - size);
    } else if (numbers[index] % 4 === 3) {
      // Draw a star pattern
      drawStar(centerX, centerY, 5, size, size * 0.6);
      fill(colorValue);
      noStroke();
    }
  }
}

// Function to draw a star
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function resetCanvas() {
  background(255);

  generateRandomColorsAndNumbers();

  displayColorGrid();

  selectedColors = [];
}

// Save Art
function saveArt() {
  saveCanvas("generative_art", "png");
}

//
