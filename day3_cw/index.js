const binarySearch = (arr, num) => {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);
    if (arr[mid] < num) {
      start = mid + 1;
    } else if (arr[mid] > num) {
      end = mid - 1;
    } else {
      return true;
    }
  }
  return false;
};

module.exports = binarySearch;
