let colors = [];
let gridSize = 5;
let boxSize;
let selectedColors = [];
let artCanvas;
let artGenerated = false;

function setup() {
  createCanvas(500, 500);
  boxSize = width / gridSize;
  noLoop();
  generateRandomColors();

  // create a separate canvas for art
  artCanvas = createCanvas(500, 500);
  artCanvas.position(0, 0);
  artCanvas.style("z-index", "-1"); //places the art canvas behind the main canvas
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
  if (!artGenerated) {
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
}

function generateArt() {
  // create random art piece based on selected colors
  artCanvas.clear();
  artCanvas.background(255);

  for (let i = 0; i < 10; i++) {
    let randomIndex = floor(random(selectedColors.length));
    let selectedColor = colors[selectedColors[randomIndex]];

    // draw a random shape with seleected color
    fill(selectedColor);
    noStroke();

    // random ellipse
    let x = random(width);
    let y = random(height);
    let size = random(20, 100);
    ellipse(x, y, size, size);
  }
  artGenerated = true;
}

function resetCanvas() {
  artCanvas.clear();
  selectedColors = [];
  displayColorGrid();
  artGenerated = false;
}
