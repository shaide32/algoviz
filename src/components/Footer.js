import React, { Component } from 'react';
import AnimationManager from '../core/animationManager';
import { AnimationSpeedBar, AnimationIndexBar } from './ProgressBar';

window.animationIndex = 0;

const prev = am => {
	am.animatePrev();
};

const next = am => {
	am.animateNext();
};

const trigger = am => {
	am.toggle();
};

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			animationIndex: 0,
			animationLength: 10,
			animationSpeed: 1000,
			testValue: 10
		};
		this.am = {
			next: () => {
				console.log('clicked next');
			},
			toggle: () => {
				console.log('clicked toggle');
			}
		};
		this.updateAnimationIndex = this.updateAnimationIndex.bind(this);
	}

	componentDidMount() {
		this.am = new AnimationManager(
			this.props.animationWrapper,
			this.state.animationSpeed,
			this.updateAnimationIndex
		);
		this.am.init();
		this.setState(() => {
			return {
				animationLength: this.am.animationHistoryLength
			};
		});
		window.am = this.am;
	}

	componentDidUpdate(prevProps, prevState, shouldResetAM) {
		if (shouldResetAM) {
			this.am = new AnimationManager(
				this.props.animationWrapper,
				this.state.animationSpeed,
				this.updateAnimationIndex
			);
			this.am.init();
			this.setState(() => {
				return {
					animationLength: this.am.animationHistoryLength
				};
			});
		}
	}

	getSnapshotBeforeUpdate(prevProps) {
		if (prevProps.animationWrapper !== this.props.animationWrapper) {
			return true;
		}

		return null;
	}

	updateAnimationIndex(value) {
		this.setState({ animationIndex: value });
	}

	render() {
		return (
			<div>
				<button onClick={() => prev(this.am)} id="next">
                    Previous Step
				</button>
				<button onClick={() => trigger(this.am)} id="trigger">
                    Play/ Pause
				</button>
				<button onClick={() => next(this.am)} id="next">
                    Next Step
				</button>
				<div>
					{/* <input type="range" name="speed" defaultValue={animationSpeed} max="2000" min="0" onChange={
                        (e) => {
                            animationSpeed = 2000 - e.target.value;
                            this.am.setAnimationSpeed(animationSpeed);
                            
                        }
                    } /> */}
					<label htmlFor="speed">Animation Speed</label>
					<AnimationSpeedBar
						name="speed"
						value={this.state.animationSpeed}
						min="0"
						max="2000"
						step="10"
						callback={values => {
							this.am.setAnimationSpeed(2000 - values[0]);
							this.setState({ animationSpeed: values[0] });
						}}
					></AnimationSpeedBar>

					<label htmlFor="speed">Animation Speed</label>
					<AnimationIndexBar
						name="speed"
						value={this.state.animationIndex}
						min="0"
						max={this.state.animationLength}
						step="1"
						callback={values => {
							const newAnimationIndex = values[0];
							if (newAnimationIndex > this.am.animationIndex) {
								this.am.animateNext(newAnimationIndex);
							} else {
								this.am.animatePrev(newAnimationIndex);
							}
							// this.setState({animationIndex: values[0]});
						}}
					></AnimationIndexBar>

				</div>
			</div>
		);
	}
}

export default Footer;
