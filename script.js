const sketchDisplay = document.querySelector('.container-display');

const range = document.querySelector('#grid-range');
const color = document.querySelector('#color-picker');

const defaultBtn = document.querySelector('#default-btn');
const randomBtn = document.querySelector('#random-btn');

const eraserBtn = document.querySelector('#eraser-btn');
const clearBtn = document.querySelector('#clear-btn');

let colorMode = true;

range.value = 10;
color.value = '#c9c9c9';

createGrid();

function setGridSize () {
    sketchDisplay.innerHTML = '';
    createGrid();
}

function outputRange () {
    document.querySelector('#grid-value1').textContent = range.value;
    document.querySelector('#grid-value2').textContent = range.value * 2;
}

function clickButton(btn, mode) {
    btn.addEventListener('click', () => {
        colorMode = mode;
        showMode();
    });
}

function showMode () {
    const toggleOn = 'color: white; background: green;';
    const toggleOff = 'color: black; background: white;';

    defaultBtn.style.cssText = toggleOff;
    randomBtn.style.cssText = toggleOff;
    eraserBtn.style.cssText = toggleOff;

    if (colorMode === true) defaultBtn.style.cssText = toggleOn;
    if (colorMode === false) randomBtn.style.cssText = toggleOn;

    if (typeof colorMode !== 'boolean') eraserBtn.style.cssText = 'color: white; background: red;';
}

function createGrid () {
    for (let i = 0; i < range.value * (range.value * 2); i++) {
        const div = document.createElement('div');
        div.className = 'grid-box';

        sketchDisplay.appendChild(div);
    }

    sketchDisplay.style.gridTemplate = `repeat(${range.value}, 1fr) / 
                                        repeat(${range.value * 2}, 1fr)`;
}

function toggleColorMode () {
    function toggle(func) {
        document.querySelectorAll('.grid-box').forEach(box => {
            box.addEventListener('mouseover', func);
        });
    }

    if (colorMode === true) {
        toggle(function () {
            this.style.background = color.value;
            this.style.borderColor = color.value;
        });
    } else if (colorMode === false) {
        toggle(function () {
            const r = Math.floor(Math.random() * 255),
                  g = Math.floor(Math.random() * 255),
                  b = Math.floor(Math.random() * 255);

            this.style.background = `rgb(${r}, ${g}, ${b})`;
            this.style.borderColor = `rgb(${r}, ${g}, ${b})`;
        });
    } else {
        toggle(function () {
            this.style.cssText = 'background: white; border-color: var(--gray);'; 
        });
    }
}

range.addEventListener('input', outputRange);
range.addEventListener('click', setGridSize);

clickButton(defaultBtn, true);
clickButton(randomBtn, false);
clickButton(eraserBtn, 'erase');

clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.grid-box').forEach(box => {
       box.style.cssText = 'background: white; border-color: var(--gray);'; 
    });
});

sketchDisplay.addEventListener('mousedown', () => {
    this.addEventListener('mouseover', toggleColorMode);
});

