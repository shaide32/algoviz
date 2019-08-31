import AnimatedArray from '../../animatedObjects/animatedArray';
const AA = new AnimatedArray(200, 200, 'cornflowerblue', 'tomato');
let arr = AA.init([120, 50, 90, 10, 70, 90, 200, 150]);
const args = [arr];
const meta = {
    name: 'BubbleSort',
    url: '/bubblesort'
}

function* bubbleSort(arr) {
    let temp;
    for (let i = 0; i < arr.length-1; i++) {
        for (let j = 0; j < arr.length-i-1; j++) {
            arr[j+1].color = AA.activeColor;
            arr[j].color = AA.activeColor;
            //drawAnimatedObjs(arr);
            yield;
            if (arr[j].height > arr[j+1].height) {
                // temp = arr[i].height;
                // arr[i].height = arr[j].height;
                // arr[j].height = temp;
                temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
                yield;
            }
            //drawAnimatedObjs(arr);

            arr[j+1].color = AA.defaultColor;
            arr[j].color = AA.defaultColor;
            //drawAnimatedObjs(arr);
            yield;

        }
    }
}

export {
    bubbleSort as fn,
    args,
    AA as animationWrapper,
    meta as metaData
};