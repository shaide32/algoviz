
const meta = {
	name: 'InsertionSort',
	url: '/insertionSort'
};

function* insertionSort(barObjects) {
	let i,
		j;
	const arr = [];

	barObjects.forEach(bar => {
		arr.push({
			data: bar.__data__,
			id: bar.id,
			transform: bar.getAttribute('transform')
		});
	});

	for (i = 1; i < arr.length; i++) {
		j = i - 1;
		// arr[i].color = AA.activeColor;
		// temp = arr[i];
		// yield;
		yield [
			{
				type: 'styles',
				id: arr[i].id,
				attr: 'fill',
				nextValue: 'red',
				prevValue: 'blue'
			}
		];
		/* Move elements of arr[0..i-1], that are  
        greater than key, to one position ahead  
        of their current position */
		const yieldVal = [];
		while (j >= 0 && arr[j].data > arr[i].data) {
			yieldVal.push({
				type: 'position',
				id: arr[j].id,
				attr: 'transform',
				nextValue: arr[j+1].transform,
				prevValue: arr[j].transform
			});
			j = j - 1;
		}
		yieldVal.push({
			type: 'position',
			id: arr[i].id,
			attr: 'transform',
			nextValue: arr[j+1].transform,
			prevValue: arr[i].transform
		});

		yield yieldVal;

		yield [
			{
				type: 'styles',
				id: arr[i].id,
				attr: 'fill',
				nextValue: 'blue',
				prevValue: 'red'
			}
		];
	}
}

export {
	insertionSort as fn,
	meta as metaData
};
