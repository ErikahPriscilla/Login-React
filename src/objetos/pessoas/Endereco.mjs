export default class Endereco {
  constructor() {
    this.cep = '';
    this.logradouro = '';
    this.bairro = '';
    this.cidade = '';
    this.uf = '';
    this.regiao = '';
  }

  getCep() {
    return this.cep;
  }
  setCep(cep) {
    this.cep = cep;
  }

  getLogradouro() {
    return this.logradouro;
  }
  setLogradouro(logradouro) {
    this.logradouro = logradouro;
  }

  getBairro() {
    return this.bairro;
  }
  setBairro(bairro) {
    this.bairro = bairro;
  }

  getCidade() {
    return this.cidade;
  }
  setCidade(cidade) {
    this.cidade = cidade;
  }

  getUf() {
    return this.uf;
  }
  setUf(uf) {
    this.uf = uf;
  }

  getRegiao() {
    return this.regiao;
  }
  setRegiao(regiao) {
    this.regiao = regiao;
  }
}
