
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
        temp = arr[i];
        yield;
        /* Move elements of arr[0..i-1], that are  
        greater than key, to one position ahead  
        of their current position */
        while (j >= 0 && arr[j].height > arr[i].height) 
        {  
            arr[j].color = AA.activeColor;
            yield;
            j = j - 1;
            
        }
        let k = i;
        while( k>0 && k > j+1) {
            arr[k] = arr[k-1];
            arr[k].color = AA.defaultColor;
            k--;
        }
        arr[k] = temp;
        temp.color = AA.defaultColor;
        yield;
        
        
    }
}

export {
    insertionSort as fn,
    meta as metaData
};