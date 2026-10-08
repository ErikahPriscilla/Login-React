export default class PJDAO {

  constructor() {
    this.chave = "pessoasJuridicas";
  }

  // Recupera os registros armazenados
  listar() {
    try {
      const dados = localStorage.getItem(this.chave);

      return dados ? JSON.parse(dados) : [];

    } catch (e) {
      console.error("Erro ao ler PJ:", e);
      return [];
    }
  }

  // Gera um identificador para o registro
  gerarId() {
    return (
      Date.now().toString(36) +
      Math.random().toString(36).substring(2, 9)
    );
  }

  // Converte a instância de PJ em objeto simples
  toPlain(pj) {

    if (!pj) return {};

    const end = pj.getEndereco?.();
    const ie = pj.getIE?.();
    const telefones = pj.getTelefones?.() || [];

    return {
      id: pj.id ?? this.gerarId(),

      nome: pj.getNome?.(),
      email: pj.getEmail?.(),
      cnpj: pj.getCNPJ?.(),

      endereco: end
        ? {
            cep: end.getCep?.(),
            logradouro: end.getLogradouro?.(),
            bairro: end.getBairro?.(),
            cidade: end.getCidade?.(),
            uf: end.getUf?.(),
            regiao: end.getRegiao?.(),
          }
        : {},

      telefones: telefones.map((t) => ({
        ddd: t.getDdd?.(),
        numero: t.getNumero?.(),
      })),

      ie: ie
        ? {
            numero: ie.getNumero?.(),
            estado: ie.getEstado?.(),
            dataRegistro: ie.getDataRegistro?.(),
          }
        : {},
    };
  }

  // CREATE: cadastra uma pessoa jurídica
  salvar(pj) {

    const lista = this.listar();
    const obj = this.toPlain(pj);

    if (!obj.id) {
      obj.id = this.gerarId();
    }

    lista.push(obj);

    localStorage.setItem(
      this.chave,
      JSON.stringify(lista)
    );

    return obj;
  }

  // UPDATE: atualiza uma pessoa jurídica
  atualizar(id, novoPJ) {

    const lista = this.listar();
    const obj = this.toPlain(novoPJ);

    obj.id = id;

    const idx = lista.findIndex(
      (p) => p.id === id
    );

    if (idx >= 0) {
      lista[idx] = obj;
    } else {
      lista.push(obj);
    }

    localStorage.setItem(
      this.chave,
      JSON.stringify(lista)
    );
  }

  // DELETE: exclui uma pessoa jurídica
  excluir(id) {

    const novaLista = this.listar().filter(
      (p) => p.id !== id
    );

    localStorage.setItem(
      this.chave,
      JSON.stringify(novaLista)
    );
  }
}