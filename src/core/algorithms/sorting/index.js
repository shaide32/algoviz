import { metaData as bubbleMetaData } from './bubbleSort';
import { metaData as insertionMetaData } from './insertionSort';

const algos = [];

algos.push(bubbleMetaData);
algos.push(insertionMetaData);

const meta = {
	name: 'Sorting',
	url: '/sorting',
	children: algos
};

export {
	meta as metaData
};
