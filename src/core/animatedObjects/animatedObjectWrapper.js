/*diff is object denoting the prev and next state of an object
    {
        aoId,
        objectProperty,
        prev,
        next
    }
*/

class AnimateObjectWrapper {

    constructor(){
        this.animationHistory = [];
        this.animationIndex = -1;
    }
    
    animate(ctx) {
        return new Promise(resolve => {
            
            let diffs = this.animatedObjects.map(ele => {
                return Math.floor((ele.currentX - ele.lastX) / 10);
            });
            console.log(diffs);
            let ele, i = 1;
            let timer;
            const iterate = () => {
                if (i === 11) {
                    ctx.clearRect(0, 0, 500, 500);
                    this.animatedObjects.forEach(ele => {
                        ele.lastX = ele.currentX;
                        ele.draw(ctx, ele.currentX, ele.lastY, ele.width, ele.height);
                    });
                    clearInterval(timer);
                    resolve();
                    
                }
                else if(i<11){
                    ctx.clearRect(0, 0, 500, 500);
                    diffs.forEach((diff, idx) => {
                        ele = this.animatedObjects[idx];
                        ctx.clearRect(ele.lastX, ele.lastY, ele.width, ele.height);
                        ele.lastX = ele.lastX + diff;
                        ele.draw(ctx, ele.lastX, ele.lastY, ele.width, ele.height);
                    });
                } 
                i++;
            }
            timer = setInterval(iterate, 50);
        })

    }


    isTimeTravelling() {
        return this.currentAnimationIndex === this.animationHistory.length - 1;
    }

    next(ctx) {
        //if( this.isTimeTravelling() ) // draw from animation history
    }

    prev() {
        
    }

}

export default AnimateObjectWrapper;