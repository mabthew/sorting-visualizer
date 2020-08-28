function insertionSort(arr) {
  var len = arr.length;
  var swaps = [];
  for (let i = 0; i < len; i++) {
    let temp = arr[i];
    let j;
    for (j = i - 1; j >= 0; j--) {
      swaps.push(["compare", j + 1, i]);
      if (arr[j].props.style.height <= temp.props.style.height) {
        break;
      }
      arr[j + 1] = arr[j];
      swaps.push(["swap", j + 1, j]);
      swaps.push(["uncompare", j + 1, i]);
    }
    console.log(j + 1, i)
    swaps.push(["uncompare", j + 1, i]);
    arr[j + 1] = temp;
  }

  // for (let i = 0; i < arr.length; i++) {
  //   swaps.push(['sorted', i])
  // } 
  return swaps;
}

export default insertionSort;