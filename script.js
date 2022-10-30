const sketchDisplay = document.querySelector('.container-display');
const range = document.querySelector('#grid-range');
const color = document.querySelector('#color-picker');


function outputRange() {
    document.querySelectorAll('.grid-value').forEach(val => {
        val.textContent = this.value;
    });
}

function setGridSize() {
    sketchDisplay.innerHTML = '';
    createGrid();
}

function createGrid() {
    const gridSize = Math.pow(range.value, 2);

    for (let i = 0; i < gridSize; i++) {
        const div = document.createElement('div');
        div.className = 'grid-box';

        sketchDisplay.appendChild(div);
    }

    sketchDisplay.style.gridTemplate = `repeat(${range.value}, 1fr) / 
                                        repeat(${range.value}, 1fr)`;
}

range.value = 16;
color.value = '#aaaaaa';
createGrid();

sketchDisplay.addEventListener('mousedown', () => {
    document.querySelectorAll('.grid-box').forEach(box => {
        box.addEventListener('mouseover', function () {
            this.style.background = color.value;
            this.style.borderColor = color.value;
        });
    });
});

range.addEventListener('input', outputRange);
range.addEventListener('click', setGridSize);

    

