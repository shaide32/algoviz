import AnimatedArray from '../../animatedObjects/animatedArray';
const arr = new AnimatedArray(200, 200, 'cornflowerblue', 'tomato');
arr.init([120, 50, 30, 60, 140, 90]);
const args = [arr];
function* bubbleSort(arr) {
    let temp;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < i; j++) {
            arr[i].color = arr.activeColor;
            arr[j].color = arr.activeColor;
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

            arr[i].color = arr.defaultColor;
            arr[j].color = arr.defaultColor;
            //drawAnimatedObjs(arr);
            //yield;

        }
    }
}

export {
    bubbleSort as fn,
    args,
    arr as animationWrapper
};