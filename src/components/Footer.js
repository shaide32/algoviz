import React, { Component } from 'react';
import AnimationManager from '../core/animationManager';
import { AnimationSpeedBar, AnimationIndexBar } from './ProgressBar';
import { Button } from 'reactstrap';

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
		// this.am.setAnimationSpeed(1000 - this.state.animationSpeed);
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
		return prevProps.animationWrapper !== this.props.animationWrapper;
	}

	updateAnimationIndex(value) {
		this.setState({ animationIndex: value });
	}

	render() {
		const disabledButton = this.am.isAnimationRunning && this.state.animationIndex < this.am.animationHistoryLength;

		return (
			<div style={{
				display: 'flex'
			}}>
				<div style={{
					flex: '1 1 auto'
				}}>
					<label htmlFor="speed">Animation Speed</label>
					<AnimationSpeedBar
						name="speed"
						value={this.state.animationSpeed}
						min="0"
						max="1000"
						step="10"
						callback={values => {
							this.am.setAnimationSpeed(1000 - values[0]);
							this.setState({ animationSpeed: values[0] });
						}}
					></AnimationSpeedBar>
				</div>

				<div
					style={{
						flex: '1 1 auto'
					}}>

					<Button
						onClick={() => prev(this.am)}
						id="next"
						disabled={disabledButton}
						color="secondary"
					>
						Previous Step
					</Button>{' '}
					<Button
						onClick={() => trigger(this.am)}
						id="trigger"
						color="primary"
					>
						Play/ Pause
					</Button>{' '}
					<Button
						onClick={() => next(this.am)}
						id="next"
						disabled={disabledButton}
						color="secondary"
					>
						Next Step
					</Button>
				</div>

				<div style={{
					flex: '1 1 auto'
				}}>
					<label htmlFor="speed">Animation Progress</label>
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
