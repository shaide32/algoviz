/* eslint-disable require-atomic-updates */

const meta = {
	name: 'InsertionSort',
	url: '/insertionsort'
};

function* insertionSort(arr = []) {
	let i,
		j,
		k;

	for (i = 1; i < arr.length; i++) {
		j = i;
		k = i-1;
		let breakFlag = false;
		while (j >= 1) {
			yield arr.highlight([j, k]);
			if (arr[j].__data__ < arr[k].__data__) {
				yield arr.swap(j, k);
			} else {
				breakFlag = true;
			}
			yield arr.unhighlight([j, k]);

			j--;
			k--;
			if (breakFlag) {
				break;
			}
		}
	}
}

export {
	insertionSort as fn,
	meta as metaData
};
