export class GameField{
    constructor(row, col, ctx) {
        this.field = [];
        this.ctx = ctx;
        for(let i=0;i<row;i++){
            this.field[i] = [];
            for(let j=0;j<col;j++){
                this.field[i][j] = null;
            }
        }
    }

    write(row, col, value){
        this.field[row][col] = value;
        this.render(50, this.field.length, this.field[0].length);
    }

    render(cellSize, row, col){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.strokeStyle = 'black';
        for(let i=0;i<=this.field.length;i++){
            this.ctx.save();
            if(i % 3 === 0) this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * cellSize);
            this.ctx.lineTo(this.field[0].length * cellSize, i * cellSize);
            this.ctx.stroke();

            this.ctx.restore();
        }
        for(let j=0;j<=this.field[0].length;j++){
            this.ctx.save();
            if(j % 3 === 0) this.ctx.lineWidth = 3;

            this.ctx.beginPath();
            this.ctx.moveTo(j * cellSize, 0);
            this.ctx.lineTo(j * cellSize, this.field.length * cellSize);
            this.ctx.stroke();

            this.ctx.restore();
        }

        for(let i=0;i<row;i++){
            for(let j=0;j<col;j++){
                this.ctx.save();

                if(this.field[i][j] !== null){
                    this.ctx.fillStyle = 'black';
                    this.ctx.font = `${cellSize / 2}px Arial`;
                    this.ctx.textAlign = 'center';
                    this.ctx.textBaseline = 'middle';
                    this.ctx.fillText(this.field[i][j], j * cellSize + cellSize / 2, i * cellSize + cellSize / 2);
                }
                this.ctx.restore();  
            }
        }
    }
}