export default class Telefone {

  constructor() {
    this.ddd = "";
    this.numero = "";
  }

  getDdd() { return this.ddd; }
  setDdd(ddd) { this.ddd = ddd; }

  getNumero() { return this.numero; }
  setNumero(numero) { this.numero = numero; }
}