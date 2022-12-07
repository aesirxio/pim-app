const numberWithCommas = (x) => {
  let number = Number(x);
  return number
    ? number % 1 !== 0
      ? number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      : number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    : 0;
};

export default numberWithCommas;
