const cpfGenerator = (): void => {
  const generate = (n: number) => {
    const ranNum = Math.round(Math.random() * n);
    return ranNum;
  };

  const mod = (dividendo: number, divisor: number) => {
    return Math.round(dividendo - Math.floor(dividendo / divisor) * divisor);
  };

  const cpf = () => {
    const n = 9;
    const n1 = generate(n);
    const n2 = generate(n);
    const n3 = generate(n);
    const n4 = generate(n);
    const n5 = generate(n);
    const n6 = generate(n);
    const n7 = generate(n);
    const n8 = generate(n);
    const n9 = generate(n);
    let d1 =
      n9 * 2 +
      n8 * 3 +
      n7 * 4 +
      n6 * 5 +
      n5 * 6 +
      n4 * 7 +
      n3 * 8 +
      n2 * 9 +
      n1 * 10;
    d1 = 11 - mod(d1, 11);
    if (d1 >= 10) {
      d1 = 0;
    }

    let d2 =
      d1 * 2 +
      n9 * 3 +
      n8 * 4 +
      n7 * 5 +
      n6 * 6 +
      n5 * 7 +
      n4 * 8 +
      n3 * 9 +
      n2 * 10 +
      n1 * 11;
    d2 = 11 - mod(d2, 11);
    if (d2 >= 10) {
      d2 = 0;
    }

    return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;
  };

  cpf();
};

export default cpfGenerator;
