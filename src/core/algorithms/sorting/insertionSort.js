/* eslint-disable require-atomic-updates */

const meta = {
	name: 'InsertionSort',
	url: '/insertionsort'
};

function* insertionSort(barObjects) {
	let i,
		j,
		k,
		temp;
	const arr = [];

	barObjects.forEach(bar => {
		arr.push({
			data: bar.__data__,
			id: bar.id,
			transform: bar.getAttribute('transform')
		});
	});
	console.log(arr);
	for (i = 1; i < arr.length; i++) {
		j = i;
		k = i-1;
		let breakFlag = false;
		while (j >= 1) {
			yield [
				{
					type: 'styles',
					id: arr[j].id,
					attr: 'fill',
					nextValue: 'red',
					prevValue: 'blue'
				},
				{
					type: 'styles',
					id: arr[k].id,
					attr: 'fill',
					nextValue: 'red',
					prevValue: 'blue'
				}
			];
			if (arr[j].data < arr[k].data) {
				temp = arr[j];
				arr[j] = arr[k];
				arr[k] = temp;
				temp = arr[j].transform;
				arr[j].transform = arr[k].transform;
				arr[k].transform = temp;
				yield [
					{
						type: 'position',
						id: arr[j].id,
						attr: 'transform',
						nextValue: arr[j].transform,
						prevValue: arr[k].transform
					},
					{
						type: 'position',
						id: arr[k].id,
						attr: 'transform',
						nextValue: arr[k].transform,
						prevValue: arr[j].transform
					}
				];
			} else {
				breakFlag = true;
			}

			yield [
				{
					type: 'styles',
					id: arr[j].id,
					attr: 'fill',
					nextValue: 'blue',
					prevValue: 'red'
				},
				{
					type: 'styles',
					id: arr[k].id,
					attr: 'fill',
					nextValue: 'blue',
					prevValue: 'red'
				}
			];

			j--;
			k--;
			if (breakFlag) {
				break;
			}
		}
	}
	console.log(arr);
}

export {
	insertionSort as fn,
	meta as metaData
};
