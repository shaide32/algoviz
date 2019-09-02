import React, {Fragment, Component} from 'react';
import { Route } from 'react-router-dom';
import BubbleSort from './BubbleSort';
import InsertionSort from './InsertionSort';
import AnimatedArray from '../../core/animatedObjects/animatedArray';
import { generateRandomizedArray } from '../../utils';

class Sorting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: generateRandomizedArray(10)
        }
    }
    render() {
        const AA = new AnimatedArray(50, 50, 'cornflowerblue', 'tomato');
        let arr = AA.init(this.state.arr);
        const args = [arr, AA];
        return (
            <Fragment>
                <button onClick={() => this.setState({arr: generateRandomizedArray(10)})}>
                    Randomize
                </button>
                <Route 
                    path={`${this.props.match.path}/bubbleSort`} 
                    render = {() => <BubbleSort args={args} animationWrapper={AA} />}
                />
                <Route 
                    path={`${this.props.match.path}/insertionSort`} 
                    render = {() => <InsertionSort args={args} animationWrapper={AA} />}
                />
            </Fragment>
            
        ); 
    }
}

export default Sorting;