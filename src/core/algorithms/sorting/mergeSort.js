/* eslint-disable require-atomic-updates */


const meta = {
	name: 'MergeSort',
	url: '/mergesort'
};

function* shiftArray(arr, leftIndex, rightIndex) {
	const yieldValue = [];
	const temp = arr[rightIndex];
	let j = rightIndex - 1;
	while (j >= leftIndex && j > -1) {
		let t = arr[j+1];

		arr[j+1] = arr[j];
		arr[j] = temp;
		t = arr[j].transform;
		arr[j].transform = arr[j+1].transform;
		arr[j+1].transform = t;
		yield [
			{
				type: 'position',
				id: arr[j+1].id,
				attr: 'transform',
				nextValue: arr[j+1].transform,
				prevValue: arr[j].transform
			}
		];
		j--;
	}
	yieldValue.push({
		type: 'position',
		id: temp.id,
		attr: 'transform',
		nextValue: arr[j + 1].transform,
		prevValue: temp.transform
	});
	const t = arr[j + 1].transform;

	arr[j + 1] = temp;
	arr[j + 1].transform = t;
	yield yieldValue;
}

function* merge(arr, leftIndex, midIndex, rightIndex) {
	let i = leftIndex,
		j = midIndex + 1;
	while (i <= midIndex && j <= rightIndex) {
		const firstIndex = i,
			lastIndex = j;

		yield [
			{
				type: 'styles',
				id: arr[firstIndex].id,
				attr: 'fill',
				nextValue: 'red',
				prevValue: 'blue'
			},
			{
				type: 'styles',
				id: arr[lastIndex].id,
				attr: 'fill',
				nextValue: 'red',
				prevValue: 'blue'
			}
		];
		if (arr[i].data > arr[j].data) {
			yield *shiftArray(arr, i, j);

			i++;
			j++;
			midIndex++;
		} else {
			i++;
		}
		yield [
			{
				type: 'styles',
				id: arr[firstIndex].id,
				attr: 'fill',
				nextValue: 'blue',
				prevValue: 'red'
			},
			{
				type: 'styles',
				id: arr[lastIndex].id,
				attr: 'fill',
				nextValue: 'blue',
				prevValue: 'red'
			}
		];
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

function* mergeSort(barObjects) {
	const arr = [];

	barObjects.forEach(bar => {
		arr.push({
			data: bar.__data__,
			id: bar.id,
			transform: bar.getAttribute('transform')
		});
	});

	console.log(arr);

	yield *mergeSortUtil(arr, 0, arr.length - 1);
	console.log(arr);
}

export {
	mergeSort as fn,
	meta as metaData
};
