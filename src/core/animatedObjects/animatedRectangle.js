import cuid from 'cuid';

class animatedRect {
    constructor(x, y, height, width, color) {
        this.id = cuid();
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

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.font = '900 16px serif';
        ctx.fillText(String(this.height), this.x, this.y + this.height + 15, this.width);
    }

    clear(ctx) {
        ctx.clearRect(this.x, this.y, this.width, this.height + 30);
    }
}

export default animatedRect;