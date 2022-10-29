const sketchDisplay = document.querySelector('.container-display');
const gridRange = document.querySelector('#grid-range');
let gridValue = gridRange.value;

function setGridSize() {
    document.querySelectorAll('.grid-value').forEach(val => {
        val.textContent = gridValue;
    });

    setTimeout(() => window.location.reload(), 200);
}

function createGrid() {
    for (let i = 0; i < Math.pow(gridRange.value, 2); i++) {
        const div = document.createElement('div');
        div.className = 'grid-box';

        sketchDisplay.appendChild(div);
    }

    document.querySelectorAll('.grid-box').forEach(box => {
        box.style.width = `calc(100% / ${gridRange.value})`;
        box.style.height = `calc(100% / ${gridRange.value})`;
    });
}

createGrid();

// let gridDivAmount = Math.pow(gridRange.value, 2);

// for (let i = 0; i < gridDivAmount; i++) {
//     sketchDisplay.innerHTML += '<div></div>';
// }

// const grids = document.querySelectorAll('.container-display > div');

// grids.forEach(grid => {
//     grid.style.width = `calc(100% / ${gridRange.value})`;
//     grid.style.height = `calc(100% / ${gridRange.value})`;
// });

sketchDisplay.addEventListener('mousedown', () => {
    document.querySelectorAll('.container-display > div').forEach(box => {
        box.addEventListener('mouseover', function () {
            this.style.background = 'gray';
        });
    });
})



gridRange.addEventListener('input', setGridSize);


    
