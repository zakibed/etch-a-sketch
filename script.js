const sketchDisplay = document.querySelector('.container-display');

const range = document.querySelector('#grid-range');
const color = document.querySelector('#color-picker');

const defaultBtn = document.querySelector('#default-btn');
const randomBtn = document.querySelector('#random-btn');

const gradientBtn = document.querySelector('#gradient-btn');
const eraserBtn = document.querySelector('#eraser-btn');
const clearBtn = document.querySelector('#clear-btn');

let colorMode = true;
let gradValue = 255;

range.value = 16;
color.value = '#c9c9c9';

createGrid();

function setGridSize () {
    sketchDisplay.innerHTML = '';
    createGrid();
}

function outputRange () {
    document.querySelectorAll('.grid-value').forEach(val => {
        val.textContent = this.value;
    });
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
    gradientBtn.style.cssText = toggleOff;
    eraserBtn.style.cssText = toggleOff;

    if (colorMode === true) defaultBtn.style.cssText = toggleOn;
    if (colorMode === false) randomBtn.style.cssText = toggleOn;

    if (colorMode === 'gradient') gradientBtn.style.cssText = 'color: white; background: gray;';
    if (colorMode === 'erase') eraserBtn.style.cssText = 'color: white; background: red;';
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

    } else if (colorMode === 'gradient') {

        toggle(function () {
            this.style.background = `rgb(${gradValue}, ${gradValue}, ${gradValue})`;
            this.style.borderColor = `rgb(${gradValue}, ${gradValue}, ${gradValue})`;

            if (gradValue > 0) gradValue -= 0.5;
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
clickButton(gradientBtn, 'gradient');
clickButton(eraserBtn, 'erase');

clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.grid-box').forEach(box => {
       box.style.cssText = 'background: white; border-color: var(--gray);'; 
    });
});

sketchDisplay.addEventListener('mousedown', () => {
    this.addEventListener('mouseover', toggleColorMode);
});

