import React, { Fragment, Component } from 'react';
import { Route } from 'react-router-dom';
import BubbleSort from './BubbleSort';
import InsertionSort from './InsertionSort';
import SelectionSort from './SelectionSort';
import MergeSort from './MergeSort';
import { generateRandomizedArray } from '../../utils';
import { Button } from 'reactstrap';

class Sorting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arr: generateRandomizedArray(50)
		};
	}


	render() {
		return (
			<Fragment>
				<div className="footer">
					<Button
						onClick={() => this.setState({ arr: generateRandomizedArray(50) })}
					>
						Randomize
					</Button>
					<br/>
					<br/>
					<Route
						path={`${this.props.match.path}/bubblesort`}
						render = {() => <BubbleSort arr={this.state.arr}/>}
					/>
					<Route
						path={`${this.props.match.path}/insertionsort`}
						render = {() => <InsertionSort arr={this.state.arr} />}
					/>
					<Route
						path={`${this.props.match.path}/selectionsort`}
						render = {() => <SelectionSort arr={this.state.arr} />}
					/>
					<Route
						path={`${this.props.match.path}/mergesort`}
						render = {() => <MergeSort arr={this.state.arr} />}
					/>
				</div>
			</Fragment>

		);
	}
}

export default Sorting;
