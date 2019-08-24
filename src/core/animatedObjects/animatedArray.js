import animatedRect from './animatedRectangle';

class AnimatedArray extends Array {
    constructor(x, y, defaultColor, activeColor) {
        super();
        this.x = x;
        this.y = y;
        this.activeColor = activeColor;
        this.defaultColor = defaultColor;

    }

    init(arr) {
        arr.forEach((ele, index) => {
            this.push(new animatedRect(this.x + index * 30, this.y, ele, 20, this.defaultColor));
        })
    }

    insert(index, item) {
        this.splice(index, 0, new animatedRect(this.x + index * 30, this.y, item, 20, this.defaultColor));
        this.rearrange();
    }

    remove(index) {
        this.splice(index, 1);
        this.rearrange();
    }

    rearrange() {
        this.map((ele, index) => {
            ele.x = this.x + index * 30;
            return ele;
        })
    }

    draw(ctx) {
        this.rearrange();
        ctx.clearRect(0, 0, 500, 500);
        this.forEach(ele => {
            ele.draw(ctx, ele.lastX, ele.lastY, ele.width, ele.height);
        });
    }

    animate(ctx) {
        return new Promise(resolve => {
            let diffs = this.map(ele => {
                return Math.floor((ele.currentX - ele.lastX) / 10);
            })
            let ele, i = 1;
            let timer;
            const iterate = () => {
                if (i === 11) {
                    ctx.clearRect(0, 0, 500, 500);
                    this.forEach(ele => {
                        ele.lastX = ele.currentX;
                        ele.draw(ctx, ele.currentX, ele.lastY, ele.width, ele.height);
                    });
                    clearInterval(timer);
                    resolve();
                    
                }
                else if(i<11){
                    ctx.clearRect(0, 0, 500, 500);
                    diffs.forEach((diff, idx) => {
                        ele = this[idx];
                        ctx.clearRect(ele.lastX, ele.lastY, ele.width, ele.height);
                        ele.lastX = ele.lastX + diff;
                        ele.draw(ctx, ele.lastX, ele.lastY, ele.width, ele.height);
                    });
                } 
                i++;
            }
            timer = setInterval(iterate, 100);
        })

    }
}

export default AnimatedArray;