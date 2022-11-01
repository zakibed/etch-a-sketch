const sketchDisplay = document.querySelector('.container-display');
const range = document.querySelector('#grid-range');
const color = document.querySelector('#color-picker');
const defaultBtn = document.querySelector('#default-btn');
const randomBtn = document.querySelector('#random-btn');

let colorMode = true;


range.value = 16;
color.value = '#c9c9c9';

createGrid();

function outputRange () {
    document.querySelectorAll('.grid-value').forEach(val => {
        val.textContent = this.value;
    });
}

function setGridSize () {
    sketchDisplay.innerHTML = '';
    createGrid();
}

function showMode() {
    const toggleOn = 'color: white; background: green;';
    const toggleOff = 'color: black; background: white;'

    if (colorMode === true) {
        defaultBtn.style.cssText = toggleOn;
        randomBtn.style.cssText = toggleOff;
    } else {
        randomBtn.style.cssText = toggleOn;
        defaultBtn.style.cssText = toggleOff;
    }
}

function createGrid () {
    const gridSize = Math.pow(range.value, 2);

    for (let i = 0; i < gridSize; i++) {
        const div = document.createElement('div');
        div.className = 'grid-box';

        sketchDisplay.appendChild(div);
    }

    sketchDisplay.style.gridTemplate = `repeat(${range.value}, 1fr) / 
                                        repeat(${range.value}, 1fr)`;
}

function toggleColorMode() {
    const gridBoxes = document.querySelectorAll('.grid-box');

    if (colorMode === true) {

        gridBoxes.forEach(box => {
            box.addEventListener('mouseover', function () {
                this.style.background = color.value;
                this.style.borderColor = color.value;
            });
        });

    } else if (colorMode === false) {

        gridBoxes.forEach(box => {
            box.addEventListener('mouseover', function () {
                const r = Math.floor(Math.random() * 255),
                      g = Math.floor(Math.random() * 255),
                      b = Math.floor(Math.random() * 255);

                this.style.background = `rgb(${r}, ${g}, ${b})`;
                this.style.borderColor = `rgb(${r}, ${g}, ${b})`;
            });
        });

    }
}

range.addEventListener('input', outputRange);
range.addEventListener('click', setGridSize);

sketchDisplay.addEventListener('mousedown', () => {
    this.addEventListener('mouseover', toggleColorMode);
});

randomBtn.addEventListener('mousedown', () => {
    colorMode = false;
    showMode();
});

defaultBtn.addEventListener('mousedown', () => {
    colorMode = true;
    showMode();
});