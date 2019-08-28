import animatedRect from './animatedRectangle';
import AnimateObjectWrapper from './animatedObjectWrapper';

class AnimatedArray extends AnimateObjectWrapper {
    constructor(x, y, defaultColor, activeColor) {
        super();
        this.x = x;
        this.y = y;
        this.activeColor = activeColor;
        this.defaultColor = defaultColor;
        this.animationHistory = [];
        this.currentAnimationIndex = -1;
        this.animatedObjects = [];
    }

    init(arr) {
        arr.forEach((ele, index) => {
            this.animatedObjects.push(new animatedRect(this.x + index * 30, this.y, ele, 20, this.defaultColor));
        })
        return this.animatedObjects;
    }

    insert(index, item) {
        this.animatedObjects.splice(index, 0, new animatedRect(this.x + index * 30, this.y, item, 20, this.defaultColor));
        this.rearrange();
    }

    remove(index) {
        this.animatedObjects.splice(index, 1);
        this.rearrange();
    }

    rearrange() {
        const arr = [];
        this.animatedObjects.map((ele, index) => {
            arr.push(ele);
            ele.x = this.x + index * 30;
            return ele;
        });
        this.animationHistory.push(arr);
        this.currentAnimationIndex++;
    }

    draw(ctx) {
        this.rearrange();
        ctx.clearRect(0, 0, 500, 500);
        this.animatedObjects.forEach(ele => {
            ele.draw(ctx, ele.lastX, ele.lastY, ele.width, ele.height);
        });
    }

}

export default AnimatedArray;