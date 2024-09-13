const Currency = {
  format: (num: number, lang: string = "pt-BR") => {
    return num.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
  },
};

export default Currency;
