import React, {Fragment, Component} from 'react';
import { Route } from 'react-router-dom';
import BubbleSort from './BubbleSort';
import InsertionSort from './InsertionSort';
import { generateRandomizedArray } from '../../utils';

class Sorting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: generateRandomizedArray(10)
        }
    }
    render() {

        return (
            <Fragment>
                <button onClick={() => this.setState({arr: generateRandomizedArray(10)})}>
                    Randomize
                </button>
                <Route 
                    path={`${this.props.match.path}/bubbleSort`} 
                    render = {() => <BubbleSort arr={this.state.arr}/>}
                />
                <Route 
                    path={`${this.props.match.path}/insertionSort`} 
                    render = {() => <InsertionSort arr={this.state.arr} />}
                />
            </Fragment>
            
        ); 
    }
}

export default Sorting;