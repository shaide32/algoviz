import React from 'react';
import { fn } from '../../core/algorithms/sorting/bubbleSort';
import Footer from '../Footer';

const BubbleSort = (props) => {
    return (
        <Footer fn={fn} {...props}></Footer>
    )
}

export default BubbleSort;