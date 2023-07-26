function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === Math.floor(arr.length / 2)) continue;
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

// Example usage:
const randomArray = [
  345, 678, 12, 987, 543, 76, 890, 234, 567, 901, 234, 789, 456, 321, 678, 890,
  123, 456, 789, 987, 654, 321, 876, 543, 210, 345, 678, 901, 987, 234, 567,
  890, 543, 876, 321, 654, 789, 234, 567, 901, 210, 876, 543, 678, 345, 12, 789,
  456, 123, 890, 567,
];
// const res = randomArray.sort((a, b) => a - b);
// console.log(res);
const sortedArray = quickSort(randomArray);
console.log(sortedArray);
