import React, { useState, useEffect } from "react";

import {
  Form,
  Input,
  Button,
  Radio,
  message
} from "antd";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import dayjs from "dayjs";

// Componentes auxiliares
import EnderecoForm from "./EnderecoFormEX.jsx";
import TelefoneList from "./TelefoneListOO.jsx";
import PFForm from "./PFForm.jsx";
import PJForm from "./PJForm.jsx";

// DAOs
import PFDAO from "../../objetos/dao/PFDAOLocal.mjs";
import PJDAO from "../../objetos/dao/PJDAOLocal.mjs";

// Classes de domínio
import PF from "../../objetos/pessoas/PF.mjs";
import PJ from "../../objetos/pessoas/PJ.mjs";
import Endereco from "../../objetos/pessoas/Endereco.mjs";
import Telefone from "../../objetos/pessoas/Telefone.mjs";
import Titulo from "../../objetos/pessoas/Titulo.mjs";
import IE from "../../objetos/pessoas/IE.mjs";

export default function PessoaFormOO() {

  const [tipo, setTipo] = useState("PF");

  const [editando, setEditando] = useState(false);

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const {
    tipo: tipoParam,
    id
  } = useParams();

  const pfDAO = new PFDAO();
  const pjDAO = new PJDAO();

  // =========================================
  // CARREGAMENTO DOS DADOS NO MODO DE EDIÇÃO
  // =========================================

  useEffect(() => {

    if (id && tipoParam) {

      setEditando(true);
      setTipo(tipoParam);

      const dao = tipoParam === "PF"
        ? pfDAO
        : pjDAO;

      const lista = dao.listar();

      const pessoa = lista.find(
        (p) => p.id === id
      );

      if (pessoa) {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

        const valores = {
          tipo: tipoParam,
          nome: pessoa.nome,
          email: pessoa.email,
          endereco: pessoa.endereco || {},
          telefones: pessoa.telefones || [],
        };

        if (tipoParam === "PF") {

          valores.cpf = pessoa.cpf;

          valores.titulo = pessoa.titulo || {
            numero: "",
            zona: "",
            secao: ""
          };

        } else {

          const ieObj = pessoa.ie || {};

          valores.cnpj = pessoa.cnpj;

          valores.ie = {
            numero: ieObj.numero || "",
            estado: ieObj.estado || "",
            dataRegistro: ieObj.dataRegistro
              ? dayjs(ieObj.dataRegistro)
              : null,
          };

        }

        form.setFieldsValue(valores);

      } else {

        message.error("Pessoa não encontrada!");

        navigate("/listar");

      }

    }

  }, [id, tipoParam]);

  // =========================================
  // ALTERAÇÃO DO TIPO DE PESSOA
  // =========================================

  function onChangeTipo(e) {

    const novoTipo = e.target.value;

    setTipo(novoTipo);

    const valoresAtuais = form.getFieldsValue();

    form.resetFields();

    form.setFieldsValue({
      ...valoresAtuais,
      tipo: novoTipo,
    });

  }

  // =========================================
  // SALVAR OU ATUALIZAR O REGISTRO
  // =========================================

  async function onFinish(values) {

    try {

      let pessoa;

      const endVals = values.endereco || {};

      // Construção do objeto Endereco
      const end = new Endereco();

      end.setCep(endVals.cep);
      end.setLogradouro(endVals.logradouro);
      end.setBairro(endVals.bairro);
      end.setCidade(endVals.cidade);
      end.setUf(endVals.uf);
      end.setRegiao(endVals.regiao);

      // =====================================
      // PESSOA FÍSICA
      // =====================================

      if (values.tipo === "PF") {

        const pf = new PF();

        pf.setNome(values.nome);
        pf.setEmail(values.email);
        pf.setCPF(values.cpf);
        pf.setEndereco(end);

        // Título eleitoral
        if (values.titulo) {

          const t = new Titulo();

          t.setNumero(values.titulo.numero);
          t.setZona(values.titulo.zona);
          t.setSecao(values.titulo.secao);

          pf.setTitulo(t);

        }

        // Telefones
        if (values.telefones?.length > 0) {

          values.telefones.forEach((tel) => {

            const fone = new Telefone();

            fone.setDdd(tel.ddd);
            fone.setNumero(tel.numero);

            pf.addTelefone(fone);

          });

        }

        pessoa = pf;

      } else {

        // ===================================
        // PESSOA JURÍDICA
        // ===================================

        const pj = new PJ();

        pj.setNome(values.nome);
        pj.setEmail(values.email);
        pj.setCNPJ(values.cnpj);
        pj.setEndereco(end);

        // Inscrição Estadual
        if (values.ie) {

          const ie = new IE();

          ie.setNumero(values.ie.numero);
          ie.setEstado(values.ie.estado);

          // Converte dayjs para string
          const dr = values.ie.dataRegistro;

          const dataRegistro =
            dr &&
            typeof dr === "object" &&
            typeof dr.format === "function"
              ? dr.format("YYYY-MM-DD")
              : dr || "";

          ie.setDataRegistro(dataRegistro);

          pj.setIE(ie);

        }

        // Telefones
        if (values.telefones?.length > 0) {

          values.telefones.forEach((tel) => {

            const fone = new Telefone();

            fone.setDdd(tel.ddd);
            fone.setNumero(tel.numero);

            pj.addTelefone(fone);

          });

        }

        pessoa = pj;

      }

      // =====================================
      // PERSISTÊNCIA: CADASTRO OU EDIÇÃO
      // =====================================

      const dao = tipo === "PF"
        ? pfDAO
        : pjDAO;

      if (editando && id) {

        dao.atualizar(id, pessoa);

        message.success(
          "Registro atualizado com sucesso!"
        );

      } else {

        dao.salvar(pessoa);

        message.success(
          "Registro criado com sucesso!"
        );

      }

      form.resetFields();

      setTimeout(
        () => navigate("/listar"),
        600
      );

    } catch (erro) {

      console.error(
        "Erro ao salvar:",
        erro
      );

      message.error(
        "Erro ao salvar registro: " + erro.message
      );

    }

  }

  // =========================================
  // APRESENTAÇÃO DO FORMULÁRIO
  // =========================================

  return (

    <div
      className="main-scroll"
      style={{
        overflowY: "auto",
        overflowX: "hidden",
        height: "100vh",
        background: "#f9f9f9",
      }}
    >

      <div
        className="form-container"
        style={{
          maxWidth: 800,
          margin: "24px auto",
          background: "#fff",
          padding: 24,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >

        <h2
          style={{
            textAlign: "center",
            marginBottom: 20
          }}
        >

          {editando
            ? `Editar ${
                tipo === "PF"
                  ? "Pessoa Física"
                  : "Pessoa Jurídica"
              }`
            : `Cadastro de ${
                tipo === "PF"
                  ? "Pessoa Física"
                  : "Pessoa Jurídica"
              }`}

        </h2>

        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          scrollToFirstError
        >

          {/* Tipo de Pessoa */}

          <Form.Item
            label="Tipo de Pessoa"
            name="tipo"
            initialValue="PF"
            style={{ marginBottom: 10 }}
          >

            <Radio.Group
              onChange={onChangeTipo}
              disabled={editando}
            >

              <Radio value="PF">
                Pessoa Física
              </Radio>

              <Radio value="PJ">
                Pessoa Jurídica
              </Radio>

            </Radio.Group>

          </Form.Item>

          {/* Nome */}

          <Form.Item
            label="Nome"
            name="nome"
            rules={[
              {
                required: true,
                message: "Informe o nome!"
              }
            ]}
          >

            <Input
              placeholder="Nome completo ou razão social"
            />

          </Form.Item>

          {/* E-mail */}

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Informe o e-mail!"
              },
              {
                type: "email",
                message: "Formato de e-mail inválido!"
              }
            ]}
          >

            <Input
              placeholder="exemplo@email.com"
            />

          </Form.Item>

          {/* CPF ou CNPJ */}

          {tipo === "PF" ? (

            <Form.Item
              label="CPF"
              name="cpf"
              rules={[
                {
                  required: true,
                  message: "Informe o CPF!"
                }
              ]}
            >

              <Input
                placeholder="Somente números"
                maxLength={11}
              />

            </Form.Item>

          ) : (

            <Form.Item
              label="CNPJ"
              name="cnpj"
              rules={[
                {
                  required: true,
                  message: "Informe o CNPJ!"
                }
              ]}
            >

              <Input
                placeholder="Somente números"
                maxLength={18}
              />

            </Form.Item>

          )}

          {/* Endereço */}

          <EnderecoForm />

          {/* Telefones */}

          <TelefoneList form={form} />

          {/* Campos específicos */}

          {tipo === "PF"
            ? <PFForm />
            : <PJForm />}

          {/* Botão principal */}

          <Form.Item
            style={{ marginTop: 20 }}
          >

            <Button
              type="primary"
              htmlType="submit"
              block
            >

              {editando
                ? "Salvar Alterações"
                : "Salvar"}

            </Button>

          </Form.Item>

          {/* Cancelamento da edição */}

          {editando && (

            <Form.Item>

              <Button
                block
                onClick={() => navigate("/listar")}
              >
                Cancelar
              </Button>

            </Form.Item>

          )}

        </Form>

      </div>

    </div>

  );
}