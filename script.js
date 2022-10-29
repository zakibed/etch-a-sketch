const sketchDisplay = document.querySelector('.container-display');
const gridRange = document.querySelector('#grid-range');

function setGridSize() {
    document.querySelector('#grid-value1').textContent = this.value;
    document.querySelector('#grid-value2').textContent = this.value;
}

let gridDivAmount = Math.pow(gridRange.value, 2);

for (let i = 0; i < gridDivAmount; i++) {
    sketchDisplay.innerHTML += '<div></div>';
}

const grids = document.querySelectorAll('.container-display > div');

grids.forEach(grid => {
    grid.style.width = `calc(100% / ${gridRange.value})`;
    grid.style.height = `calc(100% / ${gridRange.value})`;
});

sketchDisplay.addEventListener('mousedown', () => {
    grids.forEach(grid => {
        grid.addEventListener('mouseover', function () {
            this.style.background = 'gray';
        });
    });
})



gridRange.addEventListener('input', setGridSize);


    

