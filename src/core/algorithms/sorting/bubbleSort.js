
const meta = {
    name: 'BubbleSort',
    url: '/bubblesort'
}

function* bubbleSort(barObjects, AA) {
    const arr = [];
    barObjects.forEach(bar => {
        arr.push({
            data: bar.__data__,
            id: bar.id,
            transform: bar.getAttribute('transform')
        });
    });
    let temp, attr1, attr2;
    for (let i = 0; i < arr.length-1; i++) {
        for (let j = 0; j < arr.length-i-1; j++) {
            // arr[j+1].color = AA.activeColor;
            // arr[j].color = AA.activeColor;
            //drawAnimatedObjs(arr);
            yield;
            if (arr[j].data > arr[j+1].data) {
                // temp = arr[i].height;
                // arr[i].height = arr[j].height;
                // arr[j].height = temp;
                temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
                temp =  arr[j].transform;
                arr[j].transform =  arr[j+1].transform;
                arr[j+1].transform = temp;
                yield [
                    {
                        id: arr[j].id,
                        attr: 'transform',
                        value: arr[j].transform
                    },
                    {
                        id: arr[j+1].id,
                        attr: 'transform',
                        value: arr[j+1].transform
                    },

                ];
            }
            //drawAnimatedObjs(arr);

            // arr[j+1].color = AA.defaultColor;
            // arr[j].color = AA.defaultColor;
            //drawAnimatedObjs(arr);
            yield;

        }
    }
}

export {
    bubbleSort as fn,
    meta as metaData
};