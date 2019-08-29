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
        this.animationIndex = 0;
    }
    
    animate(ctx, forward=true) {
        if(forward)
            this.animationIndex++;
        else
            this.animationIndex--;
        return new Promise(resolve => {
            
            let diffs = this.animationHistory[this.animationIndex];
            console.log(diffs);
            if(!diffs || diffs.length === 0){
                resolve();
                return;
            } 
            let ele, i = 1;
            let timer;
            const iterate = () => {
                if (i === 11) {
                    diffs.forEach((diff) => {
                        ele = this.animatedObjects.find(ao => {
                            return ao.id === diff.objectId;
                        });
                        ele[diff['property']] = diff.nextValue;
                    });
                    clearInterval(timer);
                    resolve();
                    
                }
                else if(i<11){
                    diffs.forEach((diff) => {
                        ele = this.animatedObjects.find(ao => {
                            return ao.id === diff.objectId;
                        });
                        ctx.clearRect(ele.lastX, ele.lastY, ele.width, ele.height);
                        ele[diff['property']] = ele[diff['property']] +
                        Math.floor((diff.nextValue - diff.prevValue) / 10);
                        ele.draw(ctx, ele[diff['property']], ele.lastY, ele.width, ele.height);
                    });
                } 
                i++;
            }
            timer = setInterval(iterate, 100);
        })

    }


    isTimeTravelling() {
        return this.currentAnimationIndex < this.animationHistory.length - 1;
    }

}

export default AnimateObjectWrapper;