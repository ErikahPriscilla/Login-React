export default class PFDAO {

  constructor() {
    this.chave = "pessoasFisicas";
  }

  // Recupera os registros armazenados
  listar() {
    try {
      const dados = localStorage.getItem(this.chave);

      return dados ? JSON.parse(dados) : [];

    } catch (e) {
      console.error("Erro ao ler PF:", e);
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

  // Converte a instância de PF em objeto simples
  toPlain(pf) {

    if (!pf) return {};

    const end = pf.getEndereco?.();
    const titulo = pf.getTitulo?.();
    const telefones = pf.getTelefones?.() || [];

    return {
      id: pf.id ?? this.gerarId(),

      nome: pf.getNome?.(),
      email: pf.getEmail?.(),
      cpf: pf.getCPF?.(),

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

      titulo: titulo
        ? {
            numero: titulo.getNumero?.(),
            zona: titulo.getZona?.(),
            secao: titulo.getSecao?.(),
          }
        : {},
    };
  }

  // CREATE: cadastra uma pessoa física
  salvar(pf) {

    const lista = this.listar();
    const obj = this.toPlain(pf);

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

  // UPDATE: atualiza uma pessoa física
  atualizar(id, novoPF) {

    const lista = this.listar();
    const obj = this.toPlain(novoPF);

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

  // DELETE: exclui uma pessoa física
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