export function quickSort<T>(
  arr: T[],
  compareFunc: (a: T, b: T) => boolean
): T[] {
  if (arr.length < 2) return arr;
  let pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (compareFunc(pivot, arr[i])) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left, compareFunc).concat(
    pivot,
    quickSort(right, compareFunc)
  );
}
