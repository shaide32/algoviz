
const meta = {
    name: 'InsertionSort',
    url: '/insertionSort'
}

function* insertionSort(arr, AA) {
    let i, j, temp;  
    for (i = 1; i < arr.length; i++) 
    {  
        j = i - 1;
        arr[i].color = AA.activeColor;
        yield;
        /* Move elements of arr[0..i-1], that are  
        greater than key, to one position ahead  
        of their current position */
        while (j >= 0 && arr[j].height > arr[j+1].height) 
        {  
            arr[j].color = AA.activeColor;
            arr[j + 1].color = AA.activeColor;
            temp = arr[j + 1];
            arr[j + 1] = arr[j];
            arr[j] = temp;
            yield;
            arr[j].color = AA.defaultColor;
            arr[j + 1].color = AA.defaultColor;
            j = j - 1;
            
        }
        arr[i].color = AA.defaultColor;
        yield;
    }
}

export {
    insertionSort as fn,
    meta as metaData
};