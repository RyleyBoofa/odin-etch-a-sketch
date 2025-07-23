const DEFAULT_GRID_SIZE = 16;

let desiredColor = null;

const gridContainer = document.querySelector(".grid-container");
gridContainer.addEventListener("mouseover", setGridItemColor);

document.querySelector("#clear-button").addEventListener("click", clearGridColors);
document.querySelector("#resize-button").addEventListener("click", resizeGrid);

const colorButtons = document.querySelector("#color-buttons");
colorButtons.addEventListener("click", setDesiredColor);

function createGrid(gridSize = DEFAULT_GRID_SIZE) {
    const itemSize = 100 / gridSize;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.id = `row${i}-col${j}`;
            gridItem.style.width = `${itemSize}%`;
            gridItem.style.height = `${itemSize}%`;
            gridItem.style.backgroundColor = "white";
            gridContainer.appendChild(gridItem);
        }
    }
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

function setDesiredColor(event) {
    const target = event.target;

    Array.from(colorButtons.children).forEach((button) => {
        button.style.border = "";
    });

    if (target.id === "rainbow") {
        desiredColor = null;
        target.style.border = "4px solid magenta";
    } else {
        desiredColor = target.id;
        target.style.border = `4px solid ${desiredColor}`;
    }
}

function setGridItemColor(event) {
    const target = event.target;
    if (!target.classList.contains("grid-item")) return;

    const color = target.style.backgroundColor;

    if (desiredColor) {
        if (checkColorMatchesDesired(color)) {
            increaseColorAlpha(target);
        } else {
            setColorToDesired(target);
        }
    } else {
        if (color === "white") {
            setColorToRandom(target);
        } else {
            increaseColorAlpha(target);
        }
    }
}

function setColorToRandom(target) {
    let red = getRandomInt(255);
    let green = getRandomInt(255);
    let blue = getRandomInt(255);
    target.style.backgroundColor = `rgb(${red}, ${green}, ${blue}, 0.1)`;
}

function setColorToDesired(target) {
    switch (desiredColor) {
        case "white":
            target.style.backgroundColor = "white";
            break;
        case "black":
            target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
            break;
        case "red":
            target.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
            break;
        case "green":
            target.style.backgroundColor = "rgba(0, 255, 0, 0.1)";
            break;
        case "blue":
            target.style.backgroundColor = "rgba(0, 0, 255, 0.1)";
            break;
    }
}

function checkColorMatchesDesired(color) {
    switch (desiredColor) {
        case "black":
            return color.includes("(0, 0, 0");
        case "red":
            return color.includes("(255, 0, 0");
        case "green":
            return color.includes("(0, 255, 0");
        case "blue":
            return color.includes("(0, 0, 255");
        default:
            return false;
    }
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

function clearGridColors() {
    Array.from(gridContainer.children).forEach(
        (gridItem) => (gridItem.style.backgroundColor = "white")
    );
}

createGrid();
