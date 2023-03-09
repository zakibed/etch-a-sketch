const sketchDisplay = document.querySelector('.sketch-display');
const gridRange = document.querySelector('input[type="range"]');
const color = document.querySelector('#color-picker');
const defaultColorBtn = document.querySelector('#default-color-btn');
const rainbowColorBtn = document.querySelector('#rainbow-color-btn');
const eraserBtn = document.querySelector('#eraser-btn');
const clearBtn = document.querySelector('#clear-btn');
let colorMode = 'default';
let isSketching = false;

function setGridSize() {
    document
        .querySelectorAll('.sketch-display > div')
        .forEach((e) => e.remove());

    createGrid();
    toggleSketch();
}

function displayRange() {
    document.querySelector('#grid-value1').textContent = gridRange.value;
    document.querySelector('#grid-value2').textContent = gridRange.value * 2;
}

function displayColorMode() {
    const rainbowStyle =
        'linear-gradient(60deg, red, orange, yellow, green, blue, purple)';
    const toggleOff = 'color: var(--dark-gray); background: white;';

    defaultColorBtn.style.cssText = toggleOff;
    rainbowColorBtn.style.cssText = toggleOff;
    eraserBtn.style.cssText = toggleOff;

    if (colorMode === 'default') {
        defaultColorBtn.style.cssText = `color: white; background: ${color.value};`;
    } else if (colorMode === 'rainbow') {
        rainbowColorBtn.style.cssText = `color: white; background: ${rainbowStyle};`;
    } else {
        eraserBtn.style.cssText = 'color: white; background: red;';
    }
}

function createGrid() {
    const x = gridRange.value * 2;
    const y = gridRange.value;

    for (let i = 0; i < x * y; i++) {
        const div = document.createElement('div');
        div.className = 'grid-cell';

        sketchDisplay.appendChild(div);
    }

    sketchDisplay.style.gridTemplate = `repeat(${y}, 1fr) / repeat(${x}, 1fr)`;
}

function toggleSketch() {
    document.querySelectorAll('.grid-cell').forEach((box) => {
        box.addEventListener('mouseover', function () {
            if (isSketching) {
                if (colorMode === 'default') {
                    this.style.cssText = `background: ${color.value}; border-color: ${color.value};`;
                } else if (colorMode === 'rainbow') {
                    const r = Math.floor(Math.random() * 255);
                    const g = Math.floor(Math.random() * 255);
                    const b = Math.floor(Math.random() * 255);

                    this.style.cssText = `background: rgb(${r}, ${g}, ${b}); border-color: rgb(${r}, ${g}, ${b});`;
                } else {
                    this.style.cssText =
                        'background: white; border-color: white;';
                }
            }
        });
    });
}

window.onload = () => {
    gridRange.value = 10;
    color.value = '#909090';
    createGrid();
    toggleSketch();
};

gridRange.addEventListener('input', displayRange);
gridRange.addEventListener('change', setGridSize);

color.addEventListener('change', () => {
    if (colorMode === 'default') {
        defaultColorBtn.style.cssText = `color: white; background: ${color.value}`;
    }
});

clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.grid-cell').forEach((box) => {
        box.style.cssText = 'background: white; border-color: white;';
    });
});

document.querySelectorAll('#mode-buttons > button').forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.id === 'default-color-btn') colorMode = 'default';
        if (btn.id === 'rainbow-color-btn') colorMode = 'rainbow';
        if (btn.id === 'eraser-btn') colorMode = 'eraser';
        displayColorMode();
    });
});

sketchDisplay.addEventListener('mousedown', (e) => {
    isSketching = true;
    e.preventDefault();
});

sketchDisplay.addEventListener('mouseup', () => (isSketching = false));
