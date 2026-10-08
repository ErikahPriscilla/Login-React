export default class IE {

  constructor() {
    this.numero = "";
    this.estado = "";
    this.dataRegistro = "";
  }

  getNumero() { return this.numero; }
  setNumero(numero) { this.numero = numero; }

  getEstado() { return this.estado; }
  setEstado(estado) { this.estado = estado; }

  getDataRegistro() { return this.dataRegistro; }
  setDataRegistro(dataRegistro) { this.dataRegistro = dataRegistro; }
}