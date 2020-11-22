class Canvas {
    constructor(canvas, context) {
        if(!canvas) {
            throw new Error('Not found canvas')
        }

        this.context = context;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.points = [];
    }

    init(param = {}) {
        const { row = 8, coll = 12, width = 12, height = 12 } = param;
        this.check();

        this.row = row;
        this.coll = coll;
        this.width = width;
        this.height = height;

        this.canvasWidth = coll * height;
        this.canvasHeight = row * width;

        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;

        this.positions = { row: [], coll: [] };
        for(let i = 0; i < this.row; i++) { this.positions.row.push(i * this.width); }
        for(let i = 0; i < this.coll; i++) { this.positions.coll.push(i * this.height); }

        requestAnimationFrame(() => this.clearPoints());
        requestAnimationFrame(() => this.renderPoints());
        this.handleHover();
    }

    handleHover() {
        this.check();
        this.canvas.onmousemove = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const key = this.findKey(x, y);
            const point = this.points[key.main.row.index][key.main.coll.index];

            point.hover(100);
        }
    }

    renderPoints() {
        this.check();
        for(let iRow = 0; iRow < this.row; iRow++) {

            if(!this.points[iRow]) {
                this.points[iRow] = [];
            }

            for(let iColl = 0; iColl < this.coll; iColl++) {
                const x = this.width * iColl;
                const y = this.height * iRow;

                const point = new this.context(this.ctx);
                point.init(x, y, this.width, this.height);

                this.points[iRow][iColl] = point;
            }
        }
    }

    clearPoints() {
        this.ctx.clearRect(0,0, this.canvasWidth, this.canvasHeight);
    }


    check() {
        if(!this.canvas || !this.ctx) {
            throw new Error('Not found canvas');
        }
    }

    findKey(x, y) {
        const coll = this.binarySearch(this.positions.coll, x);
        const row = this.binarySearch(this.positions.row, y);
        return {
            main: { row: row, coll: coll }
        };
    }

    binarySearch(data, target) {
        let first = 0;
        let last = data.length - 1;
        let found = false;
        let result;
        let middle;

        while(found === false && first <= last) {
            middle = Math.floor((first + last) / 2);
            if(target === data[middle]) {
                found = true;
                result = { index: middle, value: data[middle] };
            } else if(target > data[middle] && target < data[middle + 1] || target > data[middle] && !data[middle + 1]) {
                found = true;
                result = { index: middle, value: data[middle] };
            } else if(target < data[middle]) {
                last = middle - 1;
            } else {
                first = middle + 1;
            }
        }
        return result;
    }
}

export { Canvas };
export default Canvas;