/* eslint-disable require-atomic-updates */

const meta = {
	name: 'SelectionSort',
	url: '/selectionsort'
};

function* selectionSort(barObjects) {
	let i,
		j,
		temp;
	const arr = [];

	barObjects.forEach(bar => {
		arr.push({
			data: bar.__data__,
			id: bar.id,
			transform: bar.getAttribute('transform')
		});
	});

	for (i = 0; i < arr.length; i++) {
		let minIndex = i;
		for (j = i+1; j < arr.length; j++) {
			minIndex = arr[minIndex].data > arr[j].data ? j : minIndex;
		}
		if (minIndex === i) {
			continue;
		}

		yield [
			{
				type: 'styles',
				id: arr[i].id,
				attr: 'fill',
				nextValue: 'red',
				prevValue: 'blue'
			},
			{
				type: 'styles',
				id: arr[minIndex].id,
				attr: 'fill',
				nextValue: 'red',
				prevValue: 'blue'
			}
		];

		temp = arr[i];
		arr[i] = arr[minIndex];
		arr[minIndex] = temp;
		temp = arr[i].transform;
		arr[i].transform = arr[minIndex].transform;
		arr[minIndex].transform = temp;
		yield [
			{
				type: 'position',
				id: arr[minIndex].id,
				attr: 'transform',
				nextValue: arr[minIndex].transform,
				prevValue: arr[i].transform
			},
			{
				type: 'position',
				id: arr[i].id,
				attr: 'transform',
				nextValue: arr[i].transform,
				prevValue: arr[minIndex].transform
			}
		];


		yield [
			{
				type: 'styles',
				id: arr[i].id,
				attr: 'fill',
				nextValue: 'blue',
				prevValue: 'red'
			},
			{
				type: 'styles',
				id: arr[minIndex].id,
				attr: 'fill',
				nextValue: 'blue',
				prevValue: 'red'
			}
		];
	}
}

export {
	selectionSort as fn,
	meta as metaData
};
