const sketchDisplay = document.querySelector('.sketch-display');
const gridRange = document.querySelector('input[type="range"]');
const colorPicker = document.querySelector('#color-picker');
const defaultBtn = document.querySelector('#default-btn');
const rainbowBtn = document.querySelector('#rainbow-btn');
const gradientBtn = document.querySelector('#gradient-btn');
const eraserBtn = document.querySelector('#eraser-btn');
const clearBtn = document.querySelector('#clear-btn');
let sketchMode = 'default';
let isSketching = false;

function setGridSize() {
    document
        .querySelectorAll('.sketch-display > div')
        .forEach((e) => e.remove());
    createGrid();
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
    toggleSketch();
}

function displayGridSize() {
    document.querySelector('#grid-value1').textContent = gridRange.value;
    document.querySelector('#grid-value2').textContent = gridRange.value * 2;
}

function displaySketchMode() {
    document
        .querySelectorAll('#sketch-modes > button')
        .forEach((e) => (e.className = 'mode-inactive'));

    if (sketchMode === 'default') defaultBtn.className = 'default-active';
    if (sketchMode === 'rainbow') rainbowBtn.className = 'rainbow-active';
    if (sketchMode === 'gradient') gradientBtn.className = 'gradient-active';
    if (sketchMode === 'eraser') eraserBtn.className = 'eraser-active';
}

function toggleSketch() {
    document.querySelectorAll('.grid-cell').forEach((box) => {
        box.addEventListener('mouseover', function () {
            if (isSketching) {
                if (sketchMode === 'default') {
                    this.style.background = colorPicker.value;
                } else if (sketchMode === 'rainbow') {
                    const r = Math.floor(Math.random() * 255);
                    const g = Math.floor(Math.random() * 255);
                    const b = Math.floor(Math.random() * 255);

                    this.style.background = `rgb(${r}, ${g}, ${b})`;
                } else {
                    this.style.background = 'white';
                }
            }
        });
    });
}

window.onload = () => {
    gridRange.value = 10;
    colorPicker.value = '#909090';
    defaultBtn.className = 'default-active';
    createGrid();
};

gridRange.addEventListener('input', displayGridSize);
gridRange.addEventListener('change', setGridSize);

clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.grid-cell').forEach((box) => {
        box.style.cssText = 'background: white; border-color: white;';
    });
});

colorPicker.addEventListener('change', function () {
    document
        .querySelector(':root')
        .style.setProperty('--color-picker-value', colorPicker.value);
});

document.querySelectorAll('#sketch-modes > button').forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.id === 'default-btn') sketchMode = 'default';
        if (btn.id === 'rainbow-btn') sketchMode = 'rainbow';
        if (btn.id === 'gradient-btn') sketchMode = 'gradient';
        if (btn.id === 'eraser-btn') sketchMode = 'eraser';

        displaySketchMode();
    });
});

sketchDisplay.addEventListener('mousedown', (e) => {
    isSketching = true;
    e.preventDefault();
});

sketchDisplay.addEventListener('mouseup', () => (isSketching = false));
