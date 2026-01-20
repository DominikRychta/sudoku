import { GameField } from './classes.js';

const canvas = document.getElementById('canvas');
const winBanner = document.getElementById('win-banner');
const ctx = canvas.getContext('2d');

const cellSize = 50;
const boardSize = cellSize * 9;

canvas.width = boardSize;
canvas.height = boardSize;

const game = new GameField(9, 9, ctx);

const initialPuzzle = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9]
];

function loadPuzzle(puzzle){
    winBanner.classList.remove('show');
    const locked = [];
    game.field = puzzle.map((row, r) => row.map((value, c) => {
        if(value !== null) locked.push(`${r},${c}`);
        return value;
    }));
    game.setLocked(locked);
    game.render();
}

loadPuzzle(initialPuzzle);

function validUnit(values){
    const seen = new Set();
    for(const value of values){
        if(value === null) return false;
        if(seen.has(value)) return false;
        seen.add(value);
    }
    return seen.size === 9;
}

function checkWin(){
    for(let r = 0; r < 9; r++){
        if(!validUnit(game.field[r])) return false;
    }

    for(let c = 0; c < 9; c++){
        const column = game.field.map(row => row[c]);
        if(!validUnit(column)) return false;
    }

    for(let br = 0; br < 3; br++){
        for(let bc = 0; bc < 3; bc++){
            const box = [];
            for(let r = 0; r < 3; r++){
                for(let c = 0; c < 3; c++){
                    box.push(game.field[br * 3 + r][bc * 3 + c]);
                }
            }
            if(!validUnit(box)) return false;
        }
    }

    return true;
}

canvas.addEventListener('click', event => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    if(row < 0 || row >= 9 || col < 0 || col >= 9) return;
    if(game.isLocked(row, col)) return;

    const current = game.field[row][col];
    const next = current === null ? 1 : current % 9 + 1;
    game.write(row, col, next);

    if(checkWin()){
        winBanner.classList.add('show');
    } else {
        winBanner.classList.remove('show');
    }
});