/* eslint-disable require-atomic-updates */


const meta = {
	name: 'MergeSort',
	url: '/mergesort'
};

function* merge(arr, leftIndex, midIndex, rightIndex) {
	let i = leftIndex,
		j = midIndex + 1;
	while (i <= midIndex && j <= rightIndex) {
		const firstIndex = i,
			lastIndex = j;

		yield arr.highlight([firstIndex, lastIndex]);
		if (arr[i].__data__ > arr[j].__data__) {
			yield arr.shiftArray(i, j);

			i++;
			j++;
			midIndex++;
			yield arr.unhighlight([firstIndex, firstIndex+1]);
		} else {
			i++;
			yield arr.unhighlight([firstIndex, lastIndex]);
		}
	}
}

function* mergeSortUtil(arr, leftIndex, rightIndex) {
	if (leftIndex < rightIndex) {
		const midIndex = Math.floor((leftIndex + rightIndex) / 2);

		yield *mergeSortUtil(arr, leftIndex, midIndex);
		yield *mergeSortUtil(arr, midIndex + 1, rightIndex);
		yield *merge(arr, leftIndex, midIndex, rightIndex);
	}
}

function* mergeSort(arr = []) {
	yield *mergeSortUtil(arr, 0, arr.length - 1);
}

export {
	mergeSort as fn,
	meta as metaData
};
