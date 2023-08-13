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

resetButton.addEventListener('click', () => clearGrid(currentColor));
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

let currentColor = 'default';
let activeButton = null;

const colorButtons = document.querySelectorAll('.colorButton');

colorButtons.forEach(button => button.addEventListener('click', () => {

  if(activeButton) {
    activeButton.classList.remove('active');
    activeButton = null;
  }

  if (currentColor) {
    clearGrid(currentColor);
    currentColor = null;
  }

  switch (button.textContent) {
    case 'Default Color':
      paintGrid();
      currentColor = 'default';
      break;
    case 'Random Color':
      randomRGB();
      currentColor = 'randomRGB';
      break;
    case '10% Color':
      opaqueColor();
      currentColor = 'opaque';
      break;
  }

  button.classList.add('active');
  activeButton = button;

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
  paintGrid();
}

function clearGrid(lastColor) {

  const grids = document.querySelectorAll('.canvasBlock');

  grids.forEach(grid => {
    grid.style.backgroundColor = 'whitesmoke';
    grid.style.opacity = ''
    grid.classList.remove('toIncrease');

    let newGrid = grid.cloneNode(true);
    grid.parentNode.replaceChild(newGrid, grid);
  });

  switch(lastColor) {
    case 'default':
      paintGrid();
      break;
    case 'randomRGB':
      randomRGB();
      break;
    case 'opaque':
      opaqueColor();
      break;
  }
}

function paintGrid() {
  const gridCanvas = document.querySelectorAll('.canvasBlock');

  gridCanvas.forEach(grid => grid.addEventListener('mouseenter', () => {
    grid.style.backgroundColor = 'blue';
  }));
}

function randomRGB() {

  const grids = document.querySelectorAll('.canvasBlock');

  grids.forEach(grid => grid.addEventListener('mouseenter', () => {
    let R = Math.floor((Math.random() * 255));
    let G = Math.floor((Math.random() * 255));
    let B = Math.floor((Math.random() * 255));

    grid.style.backgroundColor = `rgb(${R},${G},${B})`
  }));
}

function opaqueColor() {

  const grids = document.querySelectorAll('.canvasBlock');

  grids.forEach(grid => grid.addEventListener('mouseenter', () => {

    grid.style.backgroundColor = 'black';

    if (grid.classList == 'canvasBlock toIncrease') {
      let computedStyle = window.getComputedStyle(grid);
      let oldOpacity = computedStyle.getPropertyValue('opacity');
      let parsedOpacity = parseFloat(oldOpacity);
      parsedOpacity += 0.1;
      grid.style.opacity = parsedOpacity;
    } else {
      grid.classList.add('toIncrease');
    }
  }));
}