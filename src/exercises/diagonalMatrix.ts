function diagonalDifference(arr: number[][]) {
  const value = arr.reduce(
    (acc, curr, index, array) => {
      const firstValue = curr[index];
      const seccondValue = curr[array.length - 1 - index];
      console.log(curr);
      return {
        left: acc.left + firstValue,
        righ: acc.righ + seccondValue,
      };
    },
    { left: 0, righ: 0 }
  );

  return Math.abs(value.left - value.righ);
}

const teste2 = [
  [1, 2, 3],
  [4, 5, 6],
  [9, 8, 9],
];

diagonalDifference(teste2);
