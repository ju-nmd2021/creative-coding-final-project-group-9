let colors = [];
let gridSize = 4;
let boxSize;
let selectedColors = [];

function setup() {
  createCanvas(500, 500);
  boxSize = width / gridSize;
  noLoop();
  generateRandomColors();
}

function draw() {
  background(255);
  displayColorGrid();
}

function generateRandomColors() {
  colors = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    colors.push(color(random(255), random(255), random(255), 210));
  }
}

function displayColorGrid() {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let index = row * gridSize + col;
      let boxX = col * boxSize;
      let boxY = row * boxSize;

      if (selectedColors.includes(index)) {
        stroke(0, 0, 0);
        strokeWeight(4);
        noFill();
        rect(boxX, boxY, boxSize, boxSize);
      } else {
        fill(colors[index]);
        noStroke();
        rect(boxX, boxY, boxSize, boxSize);
      }
    }
  }
}

function mousePressed() {
  let col = floor(mouseX / boxSize);
  let row = floor(mouseY / boxSize);
  let index = row * gridSize + col;

  // checks if mouse is pressed within color grid
  if (col >= 0 && col < gridSize && row >= 0 && row < gridSize) {
    if (selectedColors.includes(index)) {
      selectedColors.splice(selectedColors.indexOf(index), 1);
    } else {
      selectedColors.push(index);
    }
    displayColorGrid();
  }
}
