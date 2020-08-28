function mergeSort(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  swaps,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSort(auxiliaryArray, startIdx, middleIdx, mainArray, swaps);
  mergeSort(auxiliaryArray, middleIdx + 1, endIdx, mainArray, swaps);
  merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, swaps);
}

function merge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  swaps,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    swaps.push(["compare", i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    swaps.push(["uncompare", i, j]);
    if (auxiliaryArray[i].props.style.height <= auxiliaryArray[j].props.style.height) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      swaps.push(["valueSwap", k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      swaps.push(["valueSwap", k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    // swaps.push(["compare", i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    // swaps.push(["uncompare", i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    swaps.push(["valueSwap", k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    // swaps.push(["compare", j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    // swaps.push(["uncompare", j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    swaps.push(["valueSwap", k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export default mergeSort;