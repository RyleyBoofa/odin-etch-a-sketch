const DEFAULT_GRID_SIZE = 16;
const gridContainer = document.querySelector(".grid-container");
document.querySelector("#grid-button").addEventListener("click", resizeGrid);

function createGrid(size = DEFAULT_GRID_SIZE) {
    addGridItems(size);
    addGridEventListener();
}

function resizeGrid() {
    const size = getNewGridSize();
    clearGrid();
    createGrid(size);
}

function addGridItems(size) {
    const itemWidth = gridContainer.offsetWidth / size;
    const itemHeight = gridContainer.offsetHeight / size;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.id = `row${i}-col${j}`;
            gridItem.style.width = `${itemWidth}px`;
            gridItem.style.height = `${itemHeight}px`;
            gridContainer.appendChild(gridItem);
        }
    }
}

function addGridEventListener() {
    gridContainer.addEventListener(
        "mouseenter",
        (e) => {
            e.target.style.backgroundColor = "black";
        },
        true
    );
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
    Array.from(gridContainer.children).forEach((gridItem) => {
        console.log(gridItem);
        gridItem.remove();
    });
}

createGrid();
