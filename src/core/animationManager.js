import {generateRandomizedArray} from '../utils';
class AnimationManager {
    constructor(animatedObjsWrapper, animationSpeed, progressUpdateFn) {
        this.animatedObjsWrapper = animatedObjsWrapper;
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
        this.progressUpdateFn = progressUpdateFn;
    }

    init() {
        this.animationHistory = this.animatedObjsWrapper.init(generateRandomizedArray(10));
    }

    calculateDiffs(firstIndex, lastIndex) {
        const diffsArr = this.animationHistory.slice(firstIndex, lastIndex);
        const diffsMap = {};
        diffsArr.forEach(diffs => {
            diffs.forEach( diff => {
                if(!diff.id) return;
                const key = diff.id + diff.type;
                if(diffsMap.hasOwnProperty(key)){
                    diffsMap[key] = Object.assign({}, diffsMap[key], diff);
                }
                else {
                    diffsMap[key] = diff;
                }
            });
        });
        return Object.values(diffsMap);
    }

    async animateNext(newAnimationindex = this.animationIndex+1) {
        this.progressUpdateFn(newAnimationindex);
        this.isRunningAnimationStep = true;
        this.animationIndex++;
        const diffs = this.calculateDiffs(this.animationIndex, newAnimationindex + 1);
        await this.animatedObjsWrapper.animate(diffs, 'nextValue', this.animationSpeed);
        this.isRunningAnimationStep = false;
        this.animationIndex = newAnimationindex;
        this.next(this.animationIndex+1);
    }

    async animatePrev(newAnimationindex = this.animationIndex-1) {
        this.isRunningAnimationStep = true;
        const diffs = this.calculateDiffs(newAnimationindex+1, this.animationIndex+1);
        await this.animatedObjsWrapper.animate(diffs, 'prevValue', this.animationSpeed);
        this.animationIndex = newAnimationindex;
        this.isRunningAnimationStep = false;
        this.progressUpdateFn(this.animationIndex);
    }

    next(newAnimationindex) {
        if (this.animationIndex >= this.animationHistory.length || !this.isAnimationRunning) {
            this.isAnimationRunning = false;
        } else if (!this.isRunningAnimationStep){
            this.animateNext(newAnimationindex);
        }
    }

    prev(steps = 1) {
        if (this.animationIndex < 0 || !this.isAnimationRunning) {
            this.isAnimationRunning = false;
        } else if (!this.isRunningAnimationStep) {
            this.animatePrev(steps);
        }
    }
    start() {
        //this.timer = setInterval(() => this.next(), 200);
        this.next(this.animationIndex+1);
    }

    toggle() {
        if (!this.isAnimationRunning) {
            this.isAnimationRunning = true;
            this.start();
        }
        else this.isAnimationRunning  = false;
    }

    setAnimationSpeed(val) {
        this.animationSpeed = Math.floor(val);
    }
}

export default AnimationManager;
