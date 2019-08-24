class animatedRect {
    constructor(x, y, height, width, color) {
        this.currentX = x;
        this.lastX = x;
        this.currentY = y;
        this.lastY = y;
        this.currentHeight = height;
        this.lastHeight = height;
        this.currentWidth = width;
        this.lastWidth = width;
        this.currentColor = color;
        this.lastColor = color;
    }
    set x(val) {
        this.lastX = this.currentX;
        this.currentX = val;
    }

    get x() {
        return this.currentX;
    }

    set y(val) {
        this.lastY = this.currentY;
        this.currentY = val;
    }

    get y() {
        return this.currentY;
    }

    set height(val) {
        this.lastHeight = this.currentHeight;
        this.currentHeight = val;
    }

    get height() {
        return this.currentHeight;
    }

    set width(val) {
        this.lastWidth = this.currentWidth;
        this.currentWidth = val;
    }

    get width() {
        return this.currentWidth;
    }

    set color(val) {
        this.lastColor = this.currentColor;
        this.currentColor = val;
    }

    get color() {
        return this.currentColor;
    }

    draw(ctx, x, y, w, h) {
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, w, h);
        //setTimeout(() => this.animate(ctx), 50);
        //return new Promise(resolve => setTimeout(() => this.animate(ctx, resolve), 0));
    }
}

export default animatedRect;