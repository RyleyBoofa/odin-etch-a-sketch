const GRID_SIZE = 16;

const gridContainer = document.querySelector(".grid-container");
const itemWidth = gridContainer.offsetWidth / GRID_SIZE;
const itemHeight = gridContainer.offsetHeight / GRID_SIZE;
console.log(itemWidth);

for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.id = `row${i}-col${j}`;
        gridItem.style.width = `${itemWidth}px`;
        gridItem.style.height = `${itemHeight}px`;
        gridContainer.appendChild(gridItem);
    }
}
