export default class Pessoa {

  constructor() {
    this.nome = "";
    this.email = "";
    this.endereco = null;
    this.telefones = [];
  }

  getNome() { return this.nome; }
  setNome(nome) { this.nome = nome; }

  getEmail() { return this.email; }
  setEmail(email) { this.email = email; }

  getEndereco() { return this.endereco; }
  setEndereco(endereco) { this.endereco = endereco; }

  getTelefones() { return this.telefones; }

  addTelefone(telefone) {
    this.telefones.push(telefone);
  }
}