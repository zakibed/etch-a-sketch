const sketchDisplay = document.querySelector('.container-display');
const range = document.querySelector('input[type="range"]');
const color = document.querySelector('#color-picker');
const defaultColorBtn = document.querySelector('#default-color-btn');
const rainbowColorBtn = document.querySelector('#rainbow-color-btn');
const eraserBtn = document.querySelector('#eraser-btn');
const clearBtn = document.querySelector('#clear-btn');
let colorMode = 'default';

function setGridSize() {
    sketchDisplay.innerHTML = '';
    createGrid();
}

function displayRange() {
    document.querySelector('#grid-value1').textContent = range.value;
    document.querySelector('#grid-value2').textContent = range.value * 2;
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
    const rangeValue = range.value * 2;

    for (let i = 0; i < range.value * rangeValue; i++) {
        const div = document.createElement('div');
        div.className = 'grid-box';

        sketchDisplay.appendChild(div);
    }

    sketchDisplay.style.gridTemplate = `repeat(${range.value}, 1fr) / 
                                        repeat(${rangeValue}, 1fr)`;
}

function toggleColorMode() {
    function toggle(func) {
        document.querySelectorAll('.grid-box').forEach((box) => {
            box.addEventListener('mouseover', func);
        });
    }

    if (colorMode === 'default') {
        toggle(function () {
            this.style.cssText = `background: ${color.value}; border-color: ${color.value};`;
        });
    } else if (colorMode === 'rainbow') {
        toggle(function () {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);

            this.style.cssText = `background: rgb(${r}, ${g}, ${b}); border-color: rgb(${r}, ${g}, ${b});`;
        });
    } else {
        toggle(function () {
            this.style.cssText = 'background: white; border-color: white;';
        });
    }
}

window.onload = () => {
    range.value = 10;
    color.value = '#909090';
    createGrid();
};

range.addEventListener('input', displayRange);
range.addEventListener('click', setGridSize);

sketchDisplay.addEventListener('mousedown', () => {
    this.addEventListener('mouseover', toggleColorMode);
});

color.addEventListener('change', () => {
    if (colorMode === 'default') {
        defaultColorBtn.style.cssText = `color: white; background: ${color.value}`;
    }
});

clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.grid-box').forEach((box) => {
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
