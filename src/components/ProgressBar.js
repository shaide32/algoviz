import React, { Component } from 'react';
import { Range, getTrackBackground } from 'react-range';

export class AnimationSpeedBar extends Component {
	// state = {
	//     values: [Number(this.props.value)]
	// };
	// componentDidUpdate() {
	// 	this.setState({values: [Number(this.props.value)]})
	// }

	render() {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					flexWrap: 'wrap',
					margin: '0.5em'
				}}
			>
				<Range
					values={[this.props.value]}
					step={this.props.step}
					min={this.props.min}
					max={this.props.max}
					onChange={values => {
						this.props.callback(values);
					}}
					renderTrack={({ props, children }) =>
						<div
							onMouseDown={props.onMouseDown}
							onTouchStart={props.onTouchStart}
							style={{
								...props.style,
								height: '36px',
								display: 'flex',
								width: '100%'
							}}
						>
							<div
								ref={props.ref}
								style={{
									height: '5px',
									width: '100%',
									borderRadius: '4px',
									background: getTrackBackground({
										values: [this.props.value],
										colors: ['#548BF4', '#ccc'],
										min: this.props.min,
										max: this.props.max
									}),
									alignSelf: 'center'
								}}
							>
								{children}
							</div>
						</div>
					}
					renderThumb={({ props, isDragged }) =>
						<div
							{...props}
							style={{
								...props.style,
								height: '12px',
								width: '8px',
								borderRadius: '4px',
								backgroundColor: '#FFF',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								boxShadow: '0px 2px 6px #AAA'
							}}
						>
							<div
								style={{
									height: '16px',
									width: '5px',
									backgroundColor: isDragged
										? '#548BF4'
										: '#CCC'
								}}
							/>
						</div>
					}
				/>
			</div>
		);
	}
}

export class AnimationIndexBar extends Component {
	// state = {
	//     values: [Number(this.props.value)]
	// };
	// componentDidUpdate() {
	// 	this.setState({values: [Number(this.props.value)]})
	// }

	render() {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					flexWrap: 'wrap',
					margin: '0.5em'
				}}
			>
				<Range
					values={[this.props.value]}
					step={this.props.step}
					min={this.props.min}
					max={this.props.max}
					onChange={values => {
						this.props.callback(values);
					}}
					renderTrack={({ props, children }) =>
						<div
							onMouseDown={props.onMouseDown}
							onTouchStart={props.onTouchStart}
							style={{
								...props.style,
								height: '36px',
								display: 'flex',
								width: '100%'
							}}
						>
							<div
								ref={props.ref}
								style={{
									height: '5px',
									width: '100%',
									borderRadius: '4px',
									background: getTrackBackground({
										values: [this.props.value],
										colors: ['#548BF4', '#ccc'],
										min: this.props.min,
										max: this.props.max
									}),
									alignSelf: 'center'
								}}
							>
								{children}
							</div>
						</div>
					}
					renderThumb={({ props, isDragged }) =>
						<div
							{...props}
							style={{
								...props.style,
								height: '12px',
								width: '8px',
								borderRadius: '4px',
								backgroundColor: '#FFF',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								boxShadow: '0px 2px 6px #AAA'
							}}
						>
							<div
								style={{
									height: '16px',
									width: '5px',
									backgroundColor: isDragged
										? '#548BF4'
										: '#CCC'
								}}
							/>
						</div>
					}
				/>
			</div>
		);
	}
}
// export default ProgressBar;
