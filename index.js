import { GameField } from './classes.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 450;
canvas.height = 450;

const game = new GameField(9, 9, ctx);

game.write(0, 0, null);

const buttons = document.querySelectorAll('.cell');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(`Button ${button.dataset.row}, ${button.dataset.col} clicked`);
    });
});