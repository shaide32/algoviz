import { metaData as bubbleMetaData } from './bubbleSort';
import { metaData as insertionMetaData } from './insertionSort';
import { metaData as selectionMetaData } from './selectionSort';
import { metaData as mergeMetaData } from './mergeSort';

const algos = [];

algos.push(bubbleMetaData);
algos.push(insertionMetaData);
algos.push(selectionMetaData);
algos.push(mergeMetaData);

const meta = {
	name: 'Sorting',
	url: '/sorting',
	children: algos
};

export {
	meta as metaData
};
