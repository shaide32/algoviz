import {generateRandomizedArray} from '../utils';
class AnimationManager {
    constructor(animatedObjsWrapper, animationSpeed) {
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
    }

    init() {
        this.animationHistory = this.animatedObjsWrapper.init(generateRandomizedArray(10));
    }

    async animateNext() {
        this.isRunningAnimationStep = true;
        this.animationIndex++;
        const diffs = this.animationHistory[this.animationIndex];
        await this.animatedObjsWrapper.animate(diffs, 'nextValue', this.animationSpeed);
        this.isRunningAnimationStep = false;
    }

    async animatePrev() {
        this.isRunningAnimationStep = true;
        const diffs = this.animationHistory[this.animationIndex];
        await this.animatedObjsWrapper.animate(diffs, 'prevValue', this.animationSpeed);
        this.animationIndex--;
        this.isRunningAnimationStep = false;
    }

    next() {
        if (this.animationIndex >= this.animationHistory.length) {
            window.clearTimeout(this.timer);
        } else if (!this.isRunningAnimationStep) {
            this.animateNext();
        }
    }

    prev() {
        if (this.animationIndex < 0) {
            window.clearTimeout(this.timer);
        } else if (!this.isRunningAnimationStep) {
            this.animatePrev();
        }
    }
    start() {
        this.timer = setInterval(() => this.next(), 200);
    }

    toggle() {
        if (!this.isAnimationRunning) {
            this.start();
        } else {
            window.clearTimeout(this.timer);
        }
        this.isAnimationRunning = !this.isAnimationRunning;
    }

    setAnimationSpeed(val) {
        console.log("setting speed", val);
        this.animationSpeed = Math.floor(val);
    }
}

export default AnimationManager;
