const DEFAULT_GRID_SIZE = 16;

const gridContainer = document.querySelector(".grid-container");
document.querySelector("#clear-button").addEventListener("click", clearGrid);
document.querySelector("#resize-button").addEventListener("click", resizeGrid);

function createGrid(gridSize = DEFAULT_GRID_SIZE) {
    addGridItems(gridSize);
    addGridEventListener();
}

function addGridItems(gridSize) {
    const itemWidth = gridContainer.offsetWidth / gridSize;
    const itemHeight = gridContainer.offsetHeight / gridSize;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.id = `row${i}-col${j}`;
            gridItem.style.width = `${itemWidth}px`;
            gridItem.style.height = `${itemHeight}px`;
            gridItem.style.backgroundColor = "white";
            gridContainer.appendChild(gridItem);
        }
    }
}

function addGridEventListener() {
    gridContainer.addEventListener("mouseenter", setGridItemColor, true);
}

function resizeGrid() {
    emptyGridContainer();
    createGrid(getNewGridSize());
}

function emptyGridContainer() {
    Array.from(gridContainer.children).forEach((gridItem) => gridItem.remove());
}

function getNewGridSize() {
    let newSize = 0;
    while (newSize < 1) {
        let input = parseInt(prompt("Input new grid size"));
        if (Number.isInteger(input)) {
            if (input > 0 && input <= 100) {
                newSize = input;
            }
        }
    }
    return newSize;
}

function clearGrid() {
    Array.from(gridContainer.children).forEach(
        (gridItem) => (gridItem.style.backgroundColor = "white")
    );
}

function setGridItemColor(event) {
    const target = event.target;
    if (target.style.backgroundColor === "white") {
        setRandomColor(target);
    } else {
        increaseColorAlpha(target);
    }
}

function setRandomColor(target) {
    let red = getRandomInt(255);
    let green = getRandomInt(255);
    let blue = getRandomInt(255);
    target.style.backgroundColor = `rgb(${red}, ${green}, ${blue}, 0.1)`;
}

function increaseColorAlpha(target) {
    const color = target.style.backgroundColor;
    if (color.slice(0, 4) !== "rgba") return;
    const alpha = parseFloat(color.split(", ")[3].slice(0, -1));
    target.style.backgroundColor = color.replace(alpha, alpha + 0.1);
}

function getRandomInt(number) {
    return Math.floor(Math.random() * (number + 1));
}

createGrid();
