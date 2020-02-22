/* eslint-disable require-atomic-updates */

const meta = {
	name: 'SelectionSort',
	url: '/selectionsort'
};

function* selectionSort(arr = []) {
	let i,
		j;

	for (i = 0; i < arr.length; i++) {
		let minIndex = i;

		yield arr.highlight([i]);
		for (j = i+1; j < arr.length; j++) {
			yield arr.highlight([j]);
			minIndex = arr[minIndex].__data__ > arr[j].__data__ ? j : minIndex;
			yield arr.unhighlight([j]);
		}
		if (minIndex === i) {
			yield arr.unhighlight([i]);
			continue;
		}

		yield arr.highlight([i, minIndex]);

		yield arr.swap(i, minIndex);

		yield arr.unhighlight([i, minIndex]);
	}
}

export {
	selectionSort as fn,
	meta as metaData
};
