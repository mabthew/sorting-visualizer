function insertionSort(arr) {
    var len = arr.length;
    var swaps = [];
    for (let i = 0; i < len; i++) {
      let temp = arr[i];
      let j;
      for (j = i - 1; j >= 0 && arr[j].props.style.height > temp.props.style.height; j--) {
        arr[j + 1] = arr[j];
        swaps.push([j+1, j]);
      }
      arr[j + 1] = temp;
    }
    return swaps;
}

export default insertionSort;