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

function createGrid() {
    const x = gridRange.value * 2;
    const y = gridRange.value;

    document
        .querySelectorAll('.sketch-display > div')
        .forEach((e) => e.remove());

    for (let i = 0; i < x * y; i++) {
        const div = document.createElement('div');

        div.className = 'grid-cell';
        div.addEventListener('mouseover', toggleSketchMode);
        sketchDisplay.appendChild(div);
    }

    sketchDisplay.style.gridTemplate = `repeat(${y}, 1fr) / repeat(${x}, 1fr)`;
}

function displayGridSize() {
    document.querySelector('#grid-value1').textContent = gridRange.value;
    document.querySelector('#grid-value2').textContent = gridRange.value * 2;
}

function selectSketchMode() {
    if (this.id === 'default-btn') sketchMode = 'default';
    if (this.id === 'rainbow-btn') sketchMode = 'rainbow';
    if (this.id === 'gradient-btn') sketchMode = 'gradient';
    if (this.id === 'eraser-btn') sketchMode = 'eraser';

    displaySketchMode();
}

function toggleSketchMode() {
    if (isSketching) {
        if (sketchMode === 'default') {
            this.style.background = colorPicker.value;
        } else if (sketchMode === 'rainbow') {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);

            this.style.background = `rgb(${r}, ${g}, ${b})`;
        } else if (sketchMode === 'gradient') {
            const background = this.style.background;
            const rgb =
                !background || background === 'white'
                    ? [245, 245, 245]
                    : background
                          .slice(4, background.length - 1)
                          .split(',')
                          .map((n) => (Number(n) ? Number(n) - 20 : 0));

            this.style.background = `rgb(${rgb})`;
        } else {
            this.style.background = 'white';
        }
    }
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

function resetValues() {
    gridRange.value = 10;
    colorPicker.value = '#909090';
    defaultBtn.className = 'default-active';
    createGrid();
}

function changeDefaultBtnColor() {
    document
        .querySelector(':root')
        .style.setProperty('--color-picker-value', colorPicker.value);
}

window.onload = resetValues();
gridRange.addEventListener('input', displayGridSize);
gridRange.addEventListener('change', createGrid);
colorPicker.addEventListener('change', changeDefaultBtnColor);
sketchDisplay.addEventListener('mousedown', (e) => {
    isSketching = true;
    e.preventDefault();
});
sketchDisplay.addEventListener('mouseup', () => (isSketching = false));
clearBtn.addEventListener('click', createGrid);
document.querySelectorAll('#sketch-modes > button').forEach((btn) => {
    btn.addEventListener('click', selectSketchMode);
});
