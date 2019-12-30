function selectionSort(arr){
    var len = arr.length,
        min;

    var swaps = [];
    
    for (let i=0; i < len; i++){
        
        min = i;

        for (let j=i+1; j < len; j++){
            if (arr[j].props.style.height < arr[min].props.style.height){
                min = j;
            }
        }
        
        if (i !== min){
            swaps.push([i, min]);
            var temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }
    return swaps;
}

export default selectionSort;