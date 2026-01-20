export class GameField{
    constructor(row, col, ctx) {
        this.field = [];
        this.ctx = ctx;
        this.rows = row;
        this.cols = col;
        this.cellSize = ctx.canvas.width / col;
        this.gridCanvas = this.createGridCanvas();
        this.locked = new Set();

        for(let i = 0; i < row; i++){
            this.field[i] = [];
            for(let j = 0; j < col; j++){
                this.field[i][j] = null;
            }
        }

        this.render();
    }

    setLocked(cells){
        this.locked = new Set(cells);
    }

    isLocked(row, col){
        return this.locked.has(`${row},${col}`);
    }

    createGridCanvas(){
        const gridCanvas = document.createElement('canvas');
        gridCanvas.width = this.ctx.canvas.width;
        gridCanvas.height = this.ctx.canvas.height;
        const gctx = gridCanvas.getContext('2d');

        gctx.strokeStyle = 'black';

        for(let i = 0; i <= this.rows; i++){
            gctx.save();
            if(i % 3 === 0) gctx.lineWidth = 3;
            gctx.beginPath();
            gctx.moveTo(0, i * this.cellSize);
            gctx.lineTo(this.cols * this.cellSize, i * this.cellSize);
            gctx.stroke();
            gctx.restore();
        }

        for(let j = 0; j <= this.cols; j++){
            gctx.save();
            if(j % 3 === 0) gctx.lineWidth = 3;
            gctx.beginPath();
            gctx.moveTo(j * this.cellSize, 0);
            gctx.lineTo(j * this.cellSize, this.rows * this.cellSize);
            gctx.stroke();
            gctx.restore();
        }

        return gridCanvas;
    }

    write(row, col, value){
        this.field[row][col] = value;
        this.render();
    }

    render(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.drawImage(this.gridCanvas, 0, 0);

        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                if(this.field[i][j] !== null){
                    this.ctx.save();
                    this.ctx.fillStyle = this.isLocked(i, j) ? '#111' : 'black';
                    this.ctx.font = `${this.cellSize / 2}px Arial`;
                    this.ctx.textAlign = 'center';
                    this.ctx.textBaseline = 'middle';
                    this.ctx.fillText(this.field[i][j], j * this.cellSize + this.cellSize / 2, i * this.cellSize + this.cellSize / 2);
                    this.ctx.restore();
                }
            }
        }
    }
}