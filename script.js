const sketchDisplay = document.querySelector('.container-display');

const range = document.querySelector('input[type="range"]');
const color = document.querySelector('#color-picker');

const defaultBtn = document.querySelector('#default-btn');
const rainbowBtn = document.querySelector('#rainbow-btn');

const eraserBtn = document.querySelector('#eraser-btn');
const clearBtn = document.querySelector('#clear-btn');

let colorMode = true;

range.value = 10;
color.value = '#909090';

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
    const rainbowStyle = 'linear-gradient(60deg, red, orange, yellow, green, blue, purple)';
    const toggleOff = 'color: var(--dark-gray); background: white;';

    defaultBtn.style.cssText = toggleOff;
    rainbowBtn.style.cssText = toggleOff;
    eraserBtn.style.cssText = toggleOff;

    if (colorMode === true) defaultBtn.style.cssText = `color: white; background: ${color.value};`;
    if (colorMode === false) rainbowBtn.style.cssText = `color: white; background: ${rainbowStyle};`;

    if (typeof colorMode !== 'boolean') eraserBtn.style.cssText = 'color: white; background: red;';
}

function createGrid () {
    const rangeValue = range.value * 2;

    for (let i = 0; i < range.value * rangeValue; i++) {
        const div = document.createElement('div');
        div.className = 'grid-box';

        sketchDisplay.appendChild(div);
    }

    sketchDisplay.style.gridTemplate = `repeat(${range.value}, 1fr) / 
                                        repeat(${rangeValue}, 1fr)`;
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
            this.style.cssText = 'background: white; border-color: white;'; 
        });
    }
}

range.addEventListener('input', outputRange);
range.addEventListener('click', setGridSize);

clickButton(defaultBtn, true);
clickButton(rainbowBtn, false);
clickButton(eraserBtn, 'erase');

clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.grid-box').forEach(box => {
       box.style.cssText = 'background: white; border-color: white;'; 
    });
});

color.addEventListener('change', () => {
    defaultBtn.style.cssText = `color: white; background: ${color.value}`;
});

sketchDisplay.addEventListener('mousedown', () => {
    this.addEventListener('mouseover', toggleColorMode);
});

