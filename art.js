let colors = [];
let numbers = [];
let gridSize = 5;
let boxSize;
let selectedColors = [];

function setup() {
  createCanvas(500, 500);
  boxSize = width / gridSize;
  noLoop();
  generateRandomColorsAndNumbers();
  displayColorGrid();
}

function draw() {
  // Nothing here for now
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
  background(255);
  for (let i = 0; i < selectedColors.length; i++) {
    let index = selectedColors[i];
    let colorValue = colors[index];
    let numberValue = numbers[index];

    if (numberValue % 2 === 0) {
      fill(colorValue);
      rect(random(width), random(height), 50, 50);
    } else {
      fill(colorValue);
      ellipse(random(width), random(height), 50, 50);
    }
  }
}

function resetCanvas() {
  background(255);
  generateRandomColorsAndNumbers();
  displayColorGrid();
  selectedColors = []; // Clear the selected boxes
}
