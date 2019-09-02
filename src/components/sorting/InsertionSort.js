import React from 'react';
import { fn } from '../../core/algorithms/sorting/insertionSort';
import Footer from '../Footer';

const InsertionSort = (props) => {
    return (
        <Footer fn={fn} {...props}></Footer>
    )
}

export default InsertionSort;