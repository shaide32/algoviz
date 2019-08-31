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
    
    animate(ctx, diffs, property, prevValue, nextValue) {
        return new Promise(resolve => {
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
                        ele.clear(ctx);
                        ele[diff[property]] = diff[nextValue];
                        ele.draw(ctx);
                    });
                    clearInterval(timer);
                    resolve();
                    
                }
                else if(i<11){
                    diffs.forEach((diff) => {
                        ele = this.animatedObjects.find(ao => {
                            return ao.id === diff.objectId;
                        });
                        ele.clear(ctx);
                        ele[diff[property]] = diff[prevValue] +
                        Math.floor( i * (diff[nextValue] - diff[prevValue]) / 10);
                        ele.draw(ctx);
                    });
                } 
                i++;
            }
            timer = setInterval(iterate, 100);
        })

    }


    isTimeTravelling() {
        return this.animationIndex < this.animationHistory.length - 1;
    }

}

export default AnimateObjectWrapper;