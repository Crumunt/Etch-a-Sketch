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

gridSizeButton.addEventListener('click', changeGridSize);
gridSizeButton.textContent = 'Grid Size';

const resetButton = document.createElement('button');

resetButton.addEventListener('click', clearGrid);
resetButton.textContent = 'Clear';

bottomSide.appendChild(gridSizeButton);
bottomSide.appendChild(resetButton);


createGrid(defaultGridSize);

function createGrid(size) {
  for (let i = 0; i < size; i++) {
    let gridRow = document.createElement('div');

    gridRow.classList.add('gridRow');

    for (let j = 0; j < size; j++) {
      let grid = document.createElement('div');
      grid.classList.add('non-painted');
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
    else if(newSize > 100) alert('Enter size less than 100');
    else if(newSize < 1) alert('Please Enter a size greater than 1');
  }
  removeGrid();
  createGrid(newSize);
  paintGrid();
}

function clearGrid() {
  const paintedGrid = document.querySelectorAll('.painted');

  paintedGrid.forEach(grid => {
    grid.classList.remove('painted');
    grid.classList.add('non-painted');
  });
}

container.appendChild(topSide);
container.appendChild(bottomSide);
body.append(container);

paintGrid();

function paintGrid() {
  const gridCanvas = document.querySelectorAll('.non-painted');

  gridCanvas.forEach(grid => grid.addEventListener('mouseenter', () => {
    grid.classList.remove('non-painted');
    grid.classList.add('painted');
  }));
}