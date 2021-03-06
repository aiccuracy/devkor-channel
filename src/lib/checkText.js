const checkNum = (string) => {
  if (string) {
    const num = Number(string);
    if (!isNaN(num)) {
      const isInt = num % 1 === 0 ? true : false;
      return {
        isInt: isInt,
        num: num,
      };
    }
  }
  return {
    isInt: undefined,
    num: undefined,
  };
};

export const checkText = (plainText, keyword) => {
  const textList = plainText.split(' ');
  let n = undefined;
  let msg = undefined;

  const textLen = textList.length;
  for (let i = textLen - 1; i >= 0; i--) {
    let x = textList[i];

    if (x.includes(keyword)) {
      console.log(x);
      const text = x.split(keyword)[0];
      let { isInt, num } = checkNum(text);

      if (num === 0) {
        msg = 'π€₯ 0λͺμ μ λ½μ?';
      } else if (num < 0) {
        msg = 'π© μν΄.. μμλ₯Ό μλ ₯νλ λ°λ³΄κ° μ΄λ¨μ΄. λ΄κ° μμλ‘ λ°κΏμ€κ²^^ λ€μλΆν΄ μν΄.';
        n = -num;
      } else if (num && !isInt) {
        msg = 'μ λ μμμ ..π€';
        n = num;
      } else {
        n = num;
      }
      return [n, isInt, msg];
    }
  }
};
