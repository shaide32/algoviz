

class AnimationManager {
    constructor(animatedObjsWrapper, generatorFn, fnArgs, animationSpeed) {
        this.animatedObjsWrapper = animatedObjsWrapper;
        this.generatorFn = generatorFn;
        this.fnArgs = fnArgs;
        this.isAnimationRunning = false;
        this.generatorRef = null;
        this.timer = null;
        this.isRunningAnimationStep = false;
        this.init = this.init.bind(this);
        this.start = this.start.bind(this);
        this.toggle = this.toggle.bind(this);
        this.next = this.next.bind(this);
        this.animationHistory = [];
        this.animationIndex = -1;
        this.animationSpeed = animationSpeed;
    }

    async animateNext(){
        this.isRunningAnimationStep = true;
        this.animationIndex++;
        const diffs = this.animationHistory[this.animationIndex];
        if(diffs)
            await this.animate(this.context, diffs, 'property',  'prevValue', 'nextValue');
        this.isRunningAnimationStep = false;
    }

    async animatePrev(){
        this.isRunningAnimationStep = true; 
        const diffs = this.animationHistory[this.animationIndex];
        if(diffs)
            await this.animate(this.context, diffs, 'property',  'nextValue', 'prevValue');
        this.animationIndex--;
        this.isRunningAnimationStep = false;
    }

    draw() {
        const positionsChanged = this.animatedObjsWrapper.rearrange(this.animationHistory);
        if(positionsChanged)
            this.animateNext(); 
    }

    init() {
        this.generatorRef = this.generatorFn(...this.fnArgs);
        const canvas = document.getElementById('canvas');
        this.context = canvas.getContext('2d');
        this.animatedObjsWrapper.draw(this.context, this.animationHistory);
    }

    next() {
        if(this.isTimeTravelling()){ //No need to call the alogrithm's next()
            this.animateNext(); //Next step is already present animate that
            return {
                done: false
            }
        }
        const gen = this.generatorRef.next();
        this.draw();
        return gen;
    }

    start() {
        if (this.isRunningAnimationStep) {
            this.timer = setTimeout(this.start, 100);
            return;
        }

        const gen = this.next();
        if (!gen.done)
            this.timer = setTimeout(this.start, 100);
    }

    toggle() {
        if (!this.isAnimationRunning) {
            this.start();
        }
        else {
            window.clearTimeout(this.timer);
        }
        this.isAnimationRunning = !this.isAnimationRunning;
    }

    animate(ctx, diffs, property, prevValue, nextValue) { //animation logic
        const animatedObjects = this.animatedObjsWrapper.animatedObjects;
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
                        ele = animatedObjects.find(ao => {
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
                        ele = animatedObjects.find(ao => {
                            return ao.id === diff.objectId;
                        });
                        ele.clear(ctx);
                        if( diff[property] === 'color') {
                            ele[diff[property]] = diff[nextValue];
                        }
                        else {
                            ele[diff[property]] = diff[prevValue] +
                        Math.floor( i * (diff[nextValue] - diff[prevValue]) / 10);
                        }
                        ele.draw(ctx);
                    });
                } 
                i++;
            }
            timer = setInterval(iterate, this.animationSpeed/10 );
        })

    }


    isTimeTravelling() {
        return this.animationIndex < this.animationHistory.length - 1;
    }

    setAnimationSpeed(val) {
        console.log("setting speed", val);
        this.animationSpeed = Math.floor(val);
    }
}

export default AnimationManager;