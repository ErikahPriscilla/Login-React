import Pessoa from "./Pessoa.mjs";

export default class PJ extends Pessoa {

  constructor() {
    super();
    this.cnpj = "";
    this.ie = null;
  }

  getCNPJ() { return this.cnpj; }
  setCNPJ(cnpj) { this.cnpj = cnpj; }

  getIE() { return this.ie; }
  setIE(ie) { this.ie = ie; }
}