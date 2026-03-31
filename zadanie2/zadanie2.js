function sum(x, y) {
  return x + y;
}

function sum_strings(table) {
  let res = 0;

  for (const value of table) {
    let idx = 0;
    let str = "";

    while (
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(value[idx])
    ) {
      idx++;
    }

    for (let i = 0; i < idx; i++) {
      str += value[i];
    }

    res += Number(str);
  }
  return res;
}

function digits(s) {
  let resOdd = 0;
  let resEven = 0;

  for (const digit of s) {
    if (["0", "2", "4", "6", "8"].includes(digit)) {
      resEven += Number(digit);
    } else if (["1", "3", "5", "7", "9"].includes(digit)) {
      resOdd += Number(digit);
    }
  }
  return [resOdd, resEven];
}

function letters(s) {
  let resSmall = 0;
  let resBig = 0;

  for (const letter of s) {
    if (65 <= letter.charCodeAt(0) && letter.charCodeAt(0) <= 90) {
      resBig++;
    } else if (97 <= letter.charCodeAt(0) && letter.charCodeAt(0) <= 122) {
      resSmall++;
    }
  }
  return [resSmall, resBig];
}
