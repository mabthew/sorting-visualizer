function bubbleSort(arr) {
    var swapping;
    var swaps = [];
    var len = arr.length-1;
    do {
        swapping = false;
        for (let i=0; i < len; i++)
        {
          swaps.push(["compare", i, i+1]);
          if (arr[i].props.style.height > arr[i+1].props.style.height)
          {
              let temp = arr[i];
              arr[i] = arr[i+1];
              arr[i+1] = temp;
              swaps.push(["swap", i, i+1]);
              swapping = true;
          }
          swaps.push(["uncompare", i, i+1]);
        }
        swaps.push(["sorted", len])
        len--;
    } while (swapping);

    while (len >= 0) {
      for (let i = 0; i < len; i++) {
        swaps.push(["compare", i, i+1])
        swaps.push(["uncompare", i, i+1])
      }
      swaps.push(["sorted", len+1])
      len--;
    }
    swaps.push(["sorted", len+1])

    return swaps;
  }
  
  export default bubbleSort;