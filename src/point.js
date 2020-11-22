import { Context } from './context';

class Point extends Context {
    constructor(props) {
        super(props);

        this.timer = null;
    }

    init(x = 0, y = 0, width = 1, height = 1) {
        this.x = x;
        this.y = y;
        this.width = width - 1 ;
        this.height = height - 1;

        requestAnimationFrame(() => this.render());
    }

    hover(hard = 100) {
        this.active = true;
    }

    info(){
        return {
            x1: this.x,
            y1: this.y,

            x2: this.x + this.width,
            y2: this.y,

            x3: this.x + this.width,
            y3: this.y + this.height,

            x4: this.x,
            y4: this.y + this.height
        }
    }

    render(color = 'rgba(0, 0, 0, 0)') {
        const info = this.info();

        this._ctx.beginPath();
        this._ctx.moveTo(info.x1, info.y1);
        this._ctx.lineTo(info.x2, info.y2);
        this._ctx.lineTo(info.x3, info.y3);
        this._ctx.lineTo(info.x4, info.y4);
        this._ctx.lineTo(info.x1, info.y1);
        this._ctx.closePath();
        this._ctx.fill();

        this._ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
        this._ctx.fillStyle = color;
        this._ctx.lineWidth = 2;
        this._ctx.stroke();
    }

    clear() {
        const info = this.info();
        this._ctx.clearRect(info.x1, info.y1, this.width, this.height);
    }

    get active() {
        return this._active;
    }

    set active(value) {
        if(value) {
            requestAnimationFrame(() => this.render('green'));
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                requestAnimationFrame(() => {
                    this.clear();
                    this._active = false;
                    // this.render('red')
                });
            }, 600)
        }

        return this._active = value;
    }
}

export { Point };
export default Point;