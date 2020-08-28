function selectionSort(arr) {
    var len = arr.length, min;

    var swaps = [];

    for (let i = 0; i < len; i++) {

        min = i;

        for (let j = i + 1; j < len; j++) {
            swaps.push(["compare", j, min])
            if (arr[j].props.style.height < arr[min].props.style.height) {
                swaps.push(["uncompare", min]);
                min = j;
            }
            swaps.push(["uncompare", j, min])
        }

        if (i !== min) {
            swaps.push(["swap", i, min]);
            var temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
            swaps.push(["uncompare", i])
            // swaps.push(["sorted", i])
        } else {
            swaps.push(["uncompare", min])
            // swaps.push(["sorted", min])
        }

    }
    return swaps;
}

export default selectionSort;