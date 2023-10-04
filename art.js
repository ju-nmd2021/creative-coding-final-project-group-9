let colors = [];
let gridSize = 5;
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

// Generate random colors for initial grid
function generateRandomColors() {
  colors = [];
  for (let i = 0; i < gridSize * (gridSize - 1); i++) {
    colors.push(color(random(255), random(255), random(255), 210));
  }
}

// Displays the color grid
function displayColorGrid() {
  for (let row = 0; row < gridSize - 1; row++) {
    for (let col = 0; col < gridSize; col++) {
      let index = row * gridSize + col;
      let boxX = col * boxSize;
      let boxY = row * boxSize;

      // Highlights selected boxes
      if (selectedColors.includes(index)) {
        stroke(48, 48, 48);
        strokeWeight(2);
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
  console.log("Art generated");
}
