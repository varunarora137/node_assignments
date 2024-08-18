const arraySum = (arr) => {
  const sum = arr.reduce((acc, num) => acc + num, 0);
  return sum;
};

const arrayAvg = (arr) => {
  const sum = arr.reduce((acc, num) => acc + num, 0);
  const avg = sum / arr.length;
  return avg;
};

const arrayMax = (arr) => {
  return Math.max(...arr);
};

const arrayMin = (arr) => {
  return Math.min(...arr);
};

const mergeTwoArrays = (arr1, arr2) => {
  return arr1.concat(arr2);
};

const reverseArray = (arr) => {
  return arr.reverse();
};

const removeDuplicates = (arr) => {
  return [...new Set(arr)];
};

const linearSearch = (arr, num) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === num) {
      return true;
    }
  }
  return false;
};

const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
};

const selectionSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    let temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
};

module.exports = {
  arraySum,
  arrayAvg,
  arrayMax,
  arrayMin,
  mergeTwoArrays,
  reverseArray,
  removeDuplicates,
  linearSearch,
  bubbleSort,
  selectionSort,
};
