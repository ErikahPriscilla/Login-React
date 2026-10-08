import Pessoa from "./Pessoa.mjs";

export default class PF extends Pessoa {

  constructor() {
    super();
    this.cpf = "";
    this.titulo = null;
  }

  getCPF() { return this.cpf; }
  setCPF(cpf) { this.cpf = cpf; }

  getTitulo() { return this.titulo; }
  setTitulo(titulo) { this.titulo = titulo; }
}