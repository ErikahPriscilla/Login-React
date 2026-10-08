export default class Titulo {
  constructor() {
    this.numero = '';
    this.zona = '';
    this.secao = '';
  }

  getNumero() {
    return this.numero;
  }
  setNumero(numero) {
    this.numero = numero;
  }

  getZona() {
    return this.zona;
  }
  setZona(zona) {
    this.zona = zona;
  }

  getSecao() {
    return this.secao;
  }
  setSecao(secao) {
    this.secao = secao;
  }
}
