let colors = [];
let gridSize = 4;
let boxSize;

function setup() {
  createCanvas(innerWidth, innerHeight);
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
    colors.push(color(random(255), random(255), random(255), 200));
  }
}

function displayColorGrid() {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let index = row * gridSize + col;
      fill(colors[index]);
      rect(col * boxSize, row * boxSize, boxSize, boxSize);
    }
  }
}
