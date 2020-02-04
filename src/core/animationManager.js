
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
		this.animationHistoryLength = 0;
		this.animationIndex = -1;
		this.animationSpeed = animationSpeed;
		this.progressUpdateFn = progressUpdateFn;
	}

	init() {
		this.animationHistoryLength = this.animatedObjsWrapper.init();
	}


	async animateNext(newAnimationindex = this.animationIndex+1) {
		this.isRunningAnimationStep = true;
		await this.animatedObjsWrapper.animateNext({
			currentIndex: this.animationIndex + 1,
			nextIndex: newAnimationindex + 1,
			animationSpeed: this.animationSpeed
		});
		this.isRunningAnimationStep = false;
		this.progressUpdateFn(newAnimationindex);
		this.animationIndex = newAnimationindex;
		this.next(this.animationIndex+1);
	}

	async animatePrev(newAnimationindex = this.animationIndex-1) {
		this.isRunningAnimationStep = true;
		await this.animatedObjsWrapper.animatePrev({
			currentIndex: newAnimationindex + 1,
			nextIndex: this.animationIndex + 1,
			animationSpeed: this.animationSpeed
		});
		this.animationIndex = newAnimationindex;
		this.isRunningAnimationStep = false;
		this.progressUpdateFn(this.animationIndex);
	}

	next(newAnimationindex) {
		if (this.animationIndex >= this.animationHistoryLength || !this.isAnimationRunning) {
			this.isAnimationRunning = false;
		} else if (!this.isRunningAnimationStep) {
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
		// this.timer = setInterval(() => this.next(), 200);
		this.next(this.animationIndex+1);
	}

	toggle() {
		if (!this.isAnimationRunning) {
			this.isAnimationRunning = true;
			this.start();
		} else {
			this.isAnimationRunning = false;
		}
	}

	setAnimationSpeed(val) {
		this.animationSpeed = Math.floor(val);
	}
}

export default AnimationManager;
