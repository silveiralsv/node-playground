function lonelyinteger(a: number[]) {
  if (a.length === 0) return a[0];

  for (const element of a) {
    console.log("@@@@@  -> file: play2.ts:14 -> element:", element);
    const spliceArray = [...a];
    const find = a.findIndex((e) => e === element);
    const sliced = spliceArray.splice(find, 1);
    console.log("@@@@@  -> file: play2.ts:16 -> sliced:", {
      sliced,
      spliceArray,
    });
    if (!spliceArray.includes(element)) {
      return element;
    }
  }
}

const teste = [0, 0, 1, 2, 1];

const res = lonelyinteger(teste);
console.log("@@@@@  -> file: play2.ts:15 -> res:", res);
