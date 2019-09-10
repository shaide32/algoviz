
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
            yield  [
                {   
                    type: 'styles',
                    id: arr[j].id,
                    attr: 'fill',
                    nextValue: 'red',
                    prevValue: 'blue'
                },
                {
                    type: 'styles',
                    id: arr[j+1].id,
                    attr: 'fill',
                    nextValue: 'red',
                    prevValue: 'blue'
                },

            ];
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
                        type: 'position',
                        id: arr[j].id,
                        attr: 'transform',
                        nextValue: arr[j].transform,
                        prevValue: arr[j+1].transform
                    },
                    {
                        type: 'position',
                        id: arr[j+1].id,
                        attr: 'transform',
                        nextValue: arr[j+1].transform,
                        prevValue: arr[j].transform
                    },

                ];
            }
            //drawAnimatedObjs(arr);

            // arr[j+1].color = AA.defaultColor;
            // arr[j].color = AA.defaultColor;
            //drawAnimatedObjs(arr);
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
                    id: arr[j+1].id,
                    attr: 'fill',
                    nextValue: 'blue',
                    prevValue: 'red'
                },

            ];;

        }
    }
}

export {
    bubbleSort as fn,
    meta as metaData
};