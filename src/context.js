class Context {
    constructor(ctx) {
        this._ctx = ctx;
        this.active = false;

        this.check();
    }

    check() {
        if(!this._ctx) {
            throw new Error('Not found ctx');
        }
    }

    init(x, y, width, height) {
        throw new Error('Not found Context.init');
    }

    hover(hard) {
        throw new Error('Not found Context.hover');
    }

    get ctx() {
        return this._ctx;
    }
}

export { Context };
export default Context;