const sketchDisplay = document.querySelector('.container-display');
const range = document.querySelector('#grid-range');

range.value = 16;
createGrid(Math.pow(range.value, 2));

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

sketchDisplay.addEventListener('mousedown', () => {
    document.querySelectorAll('.grid-box').forEach(box => {
        box.addEventListener('mouseover', function () {
            this.style.background = 'gray';
        });
    });
});

range.addEventListener('input', outputRange);
range.addEventListener('click', setGridSize);


    

