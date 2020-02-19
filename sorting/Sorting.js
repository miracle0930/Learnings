const performance = require('perf_hooks').performance;

let length = 10;
const data = Array.from({ length }, () => Math.floor(Math.random() * length));
const answer = data.slice(0).sort((a, b) => a - b);

const checkResult = (input, sortMethod, start, end) => {
  let correct = true;
  for (let i = 0; i < input.length; i += 1) {
    if (answer[i] !== input[i]) {
      correct = false;
      wrongIndex = i;
      break;
    }
  }
  console.log(`\x1b[36m${sortMethod}\x1b[0m, data length: ${input.length}, time comsume: \x1b[35m ${end - start}ms \x1b[0m`);
  console.log(`${correct ? 'Correct' : 'Wrong'}`);
  if (!correct) {
    console.log('Test:\n' + data);
    console.log('Your answer:\n' + input);
    console.log('Expected:\n' + answer);
  }
  console.log('--------\n');
}



const selectionSort = (input) => {
  
  const start = performance.now();
  const arr = input.slice(0);

  for (let i = 0; i < arr.length; i += 1) {
    let minIndex = i;
    let min = arr[i];
    for (let j = i; j < arr.length; j += 1) {
      if (arr[j] < min) {
        min = arr[j];
        minIndex = j;
      }
    }
    let temp = arr[i];
    arr[i] = min;
    arr[minIndex] = temp;
  }

  const end = performance.now();
  checkResult(arr, 'Selection sort', start, end);

}

const bubbleSort = (input) => {
  const start = performance.now();
  const arr = input.slice(0);

  for (let i = arr.length - 1; i >= 0; i -= 1) {
    for (let j = arr.length - 1; j >= arr.length - i; j -= 1) {
      if (arr[j - 1] > arr[j]) {
        let temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  const end = performance.now();
  checkResult(arr, 'Bubble sort', start, end);

}

const insertionSort = (input) => {
  const start = performance.now();
  const arr = input.slice(0);
  for (let i = 1; i < arr.length; i += 1) {
    let temp = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j -= 1;
    }
    arr[j + 1] = temp;
  }
  const end = performance.now();
  checkResult(arr, 'Inseration sort', start, end);
}

const quickSort = (input) => {
  const start = performance.now();
  const arr = input.slice(0);
  const helper = (startIndex, endIndex) => {
    const length = endIndex - startIndex + 1;
    if (length <= 1) {
      return;
    }

    const pivotal = arr[startIndex];

    let left = startIndex;
    let right = endIndex;

    while (left < right) {
      while (right > left && arr[right] > pivotal) {
        right -= 1;
      }
      if (left < right) {
        arr[left] = arr[right];
        left += 1;
      }
      while (left < right && arr[left] < pivotal) {
        left += 1;
      }
      if (left < right) {
        arr[right] = arr[left];
        right -= 1;
      }
    }
    arr[left] = pivotal;
    helper(startIndex, left - 1);
    helper(left + 1, endIndex);
  }
  helper(0, arr.length - 1);
  const end = performance.now();
  checkResult(arr, 'Quick sort', start, end);
}

const mergeSort = (input) => {
  const start = performance.now();
  const arr = input.slice(0);
  const temp = [];
  const sort = (left, right) => {
    if (right - left + 1 <= 1) {
      return;
    }
    let mid = left + (right - left) / 2;
    sort(arr, temp, left, mid);
    sort(arr, temp, mid + 1, right);
    merge(arr, temp, left, mid, right);
  }

  const merge = (left, mid, right) => {
    let i = left;
    let j = mid;
    let t = 0;
    while (i < mid && mid < right) {
      if (arr[i] <= arr[j]) {
        temp[t] = arr[i];
        i += 1;
        t += 1;
      } else {
        temp[t] = arr[j];
        j += 1;
        t += 1;
      }
    }
    while (i < mid) {
      temp[i] = arr[i];
      i += 1;
      t += 1;
    }
    while (j < right) {
      temp[j] = arr[j];
      j += 1;
      t += 1;
    }
    t = 0;
    while (left < right) {
      arr[left] = temp[t];
      left += 1;
      t += 1;
    }
  }
  sort(0, arr.length - 1);
  const end = performance.now();
  checkResult(arr, 'Merge sort', start, end);
}


// selectionSort(data);
// bubbleSort(data);
// insertionSort(data);
// quickSort(data);
mergeSort(data);