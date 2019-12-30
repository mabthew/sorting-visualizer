function bubbleSort(arr) {
    var swapping;
    var swaps = [];
    var len = arr.length-1;
    do {
        swapping = false;
        for (let i=0; i < len; i++)
        {
          if (arr[i].props.style.height > arr[i+1].props.style.height)
          {
              let temp = arr[i];
              arr[i] = arr[i+1];
              arr[i+1] = temp;
              swaps.push([i, i+1]);
              swapping = true;
          }
        }
        len--;
    } while (swapping);
    return swaps;
  }
  
  export default bubbleSort;