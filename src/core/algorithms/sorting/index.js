import { metaData as bubbleMetaData } from './bubbleSort';
import { metaData as insertionMetaData } from './insertionSort';
import { metaData as selectionMetaData } from './selectionSort';

const algos = [];

algos.push(bubbleMetaData);
algos.push(insertionMetaData);
algos.push(selectionMetaData);

const meta = {
	name: 'Sorting',
	url: '/sorting',
	children: algos
};

export {
	meta as metaData
};
