/* eslint-disable require-atomic-updates */

const meta = {
	name: 'BubbleSort',
	url: '/bubblesort'
};

function* bubbleSort(arr = []) {
	for (let i = 0; i < arr.length-1; i++) {
		for (let j = 0; j < arr.length-i-1; j++) {
			yield arr.highlight([j, j+1]);
			if (arr[j].__data__ > arr[j+1].__data__) {
				yield arr.swap(j, j+1);
			}
			yield arr.unhighlight([j, j+1]);
		}
	}
}

export {
	bubbleSort as fn,
	meta as metaData
};
