
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
		this.animationHistoryLength = 0;
		this.animationIndex = -1;
		this.animationSpeed = animationSpeed;
		this.progressUpdateFn = progressUpdateFn;
	}

	init() {
		this.animationHistoryLength = this.animatedObjsWrapper.init();
	}

	async animate({
		animateFn,
		currentIndex,
		nextIndex,
		animationSpeed,
		newAnimationindex
	}) {
		this.isRunningAnimationStep = true;
		await animateFn({
			currentIndex,
			nextIndex,
			animationSpeed
		});
		this.isRunningAnimationStep = false;
		this.animationIndex = newAnimationindex;
		this.progressUpdateFn(this.animationIndex);
	}

	animateNext(newAnimationindex = this.animationIndex+1) {
		this.animate({
			currentIndex: this.animationIndex + 1,
			nextIndex: newAnimationindex + 1,
			animationSpeed: this.animationSpeed,
			animateFn: this.animatedObjsWrapper.animateNext,
			newAnimationindex
		});
	}

	animatePrev(newAnimationindex = this.animationIndex-1) {
		this.animate({
			currentIndex: newAnimationindex + 1,
			nextIndex: this.animationIndex + 1,
			animationSpeed: this.animationSpeed,
			animateFn: this.animatedObjsWrapper.animatePrev,
			newAnimationindex
		});
	}

	start() {
		const tick = () => {
			while (
				this.animationIndex < this.animationHistoryLength &&
				this.isAnimationRunning &&
				!this.isRunningAnimationStep
			) {
				console.log(this.animationIndex);
				this.animateNext();
			}
			window.requestAnimationFrame(tick);
		};

		window.requestAnimationFrame(tick);
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
