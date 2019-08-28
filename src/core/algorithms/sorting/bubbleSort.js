import AnimatedArray from '../../animatedObjects/animatedArray';
const AA = new AnimatedArray(200, 200, 'cornflowerblue', 'tomato');
let arr = AA.init([120, 50, 30, 60, 140, 90]);
const args = [arr];
const meta = {
    name: 'BubbleSort',
    url: '/bubblesort'
}

function* bubbleSort(arr) {
    let temp;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < i; j++) {
            arr[i].color = AA.activeColor;
            arr[j].color = AA.activeColor;
            //drawAnimatedObjs(arr);
            yield;
            if (arr[j].height > arr[i].height) {
                // temp = arr[i].height;
                // arr[i].height = arr[j].height;
                // arr[j].height = temp;
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                yield;
            }
            //drawAnimatedObjs(arr);

            arr[i].color = AA.defaultColor;
            arr[j].color = AA.defaultColor;
            //drawAnimatedObjs(arr);
            //yield;

        }
    }
}

export {
    bubbleSort as fn,
    args,
    AA as animationWrapper,
    meta as metaData
};