let defaultGridSize = 16;

const body = document.querySelector('body');
const container = document.createElement('div');
container.classList.add('container');

const title = document.createElement('h3');

title.textContent = 'Etch-a-Sketch';
title.classList.add('title');

container.appendChild(title);

const bottomSide = document.createElement('div');
const topSide = document.createElement('div');

bottomSide.classList.add('bottomSide');
topSide.classList.add('topSide');

const gridSizeButton = document.createElement('button');
const resetButton = document.createElement('button');
const blueButton = document.createElement('button');
const rgbButton = document.createElement('button');
const opaqueButton = document.createElement('button');

gridSizeButton.addEventListener('click', changeGridSize);
gridSizeButton.textContent = 'Grid Size';

resetButton.addEventListener('click', clearGrid);
resetButton.textContent = 'Clear';

blueButton.classList.add('colorButton');
blueButton.textContent = 'Default Color'

rgbButton.classList.add('colorButton');
rgbButton.textContent = 'Random Color';

opaqueButton.classList.add('colorButton');
opaqueButton.textContent = '10% Color';

bottomSide.appendChild(gridSizeButton);
bottomSide.appendChild(blueButton);
bottomSide.appendChild(rgbButton);
bottomSide.appendChild(opaqueButton);
bottomSide.appendChild(resetButton);

createGrid(defaultGridSize);

container.appendChild(topSide);
container.appendChild(bottomSide);
body.append(container);

paintGrid();

const colorButtons = document.querySelectorAll('.colorButton');

colorButtons.forEach(button => button.addEventListener('click', () => {

  switch (button.textContent) {
    case 'Default Color':
      paintGrid();
      break;
    case 'Random Color':
      randomRGB();
      break;
    case '10% Color':
      opaqueColor();
      break;
  }
}));

function createGrid(size) {
  for (let i = 0; i < size; i++) {
    let gridRow = document.createElement('div');

    gridRow.classList.add('gridRow');

    for (let j = 0; j < size; j++) {
      let grid = document.createElement('div');
      grid.classList.add('canvasBlock');
      gridRow.appendChild(grid);
    }
    topSide.appendChild(gridRow);
  }
}

function removeGrid() {
  const gridContainer = document.querySelector('.topSide');

  let currentGrid = gridContainer.lastElementChild;

  while (currentGrid) {
    gridContainer.removeChild(currentGrid);
    currentGrid = gridContainer.lastElementChild;
  }
}

function changeGridSize() {

  let newSize;
  while (true) {
    newSize = prompt('Enter size between 1 and 100');
    if (newSize <= 100 && newSize > 1) break;
    else if (newSize > 100) alert('Enter size less than 100');
    else if (newSize < 1) alert('Please Enter a size greater than 1');
  }
  removeGrid();
  createGrid(newSize);
}

function clearGrid() {
  const paintedGrid = document.querySelectorAll('.canvasBlock');

  paintedGrid.forEach(grid => {
    grid.style.cssText = '';
  });
}

function chooseColor(color) {

  switch (color) {
    case 'blue':
      paintGrid();
      break;
    case 'RGB':
      randomRGB();
      break;
  }
}

function paintGrid() {
  const gridCanvas = document.querySelectorAll('.canvasBlock');

  gridCanvas.forEach(grid => grid.addEventListener('mouseenter', () => {
    grid.style.cssText = 'background-color: blue';
  }));
}

function randomRGB() {

  const grids = document.querySelectorAll('.canvasBlock');

  grids.forEach(grid => grid.addEventListener('mouseenter', () => {
    let R = Math.floor((Math.random() * 255));
    let G = Math.floor((Math.random() * 255));
    let B = Math.floor((Math.random() * 255));
    grid.style.cssText = `background-color: rgb(${R},${G},${B});`
  }));
}

function opaqueColor() {

  const grids = document.querySelectorAll('.canvasBlock');

  let opacity = 0;

  grids.forEach(grid => grid.addEventListener('mouseenter', () => {
    if(grid.classList == 'opaque canvasBlock') opacity += 0.1;
    else opacity = 0.1;
    grid.style.cssText = `background-color: rgb(0,0,0); opacity: ${opacity}`
    grid.classList = 'opaque canvasBlock';
  }));
}
