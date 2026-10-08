import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  message,
  Spin
} from "antd";

const UFS = [
  "AC","AL","AP","AM","BA","CE","DF",
  "ES","GO","MA","MT","MS","MG","PA",
  "PB","PR","PE","PI","RJ","RN","RS",
  "RO","RR","SC","SP","SE","TO"
];

export default function EnderecoFormEX() {

  const form = Form.useFormInstance();

  const [buscandoCEP, setBuscandoCEP] =
    useState(false);

  function obterRegiao(uf) {

    const mapa = {

      Norte:
        ["AC","AP","AM","PA","RO","RR","TO"],

      Nordeste:
        ["AL","BA","CE","MA","PB","PE","PI","RN","SE"],

      "Centro-Oeste":
        ["DF","GO","MT","MS"],

      Sudeste:
        ["ES","MG","RJ","SP"],

      Sul:
        ["PR","RS","SC"]
    };

    for (const [regiao, estados]
      of Object.entries(mapa)) {

      if (estados.includes(uf)) {
        return regiao;
      }
    }

    return "";
  }

  async function handleCepChange(e) {

    const cep =
      (e.target.value || "")
        .replace(/\D/g, "");

    if (cep.length === 8) {

      setBuscandoCEP(true);

      try {

        const resp = await fetch(
          `https://viacep.com.br/ws/${cep}/json/`
        );

        const dados = await resp.json();

        if (dados?.erro) {

          message.warning(
            "CEP não encontrado!"
          );

          setBuscandoCEP(false);

          return;
        }

        const uf = dados.uf || "";
        const regiao = obterRegiao(uf);

        const atual =
          form.getFieldValue("endereco") || {};

        form.setFieldsValue({

          endereco: {

            ...atual,

            cep,

            logradouro:
              dados.logradouro || "",

            bairro:
              dados.bairro || "",

            cidade:
              dados.localidade || "",

            uf,

            regiao
          }
        });

      } catch (err) {

        message.error(
          "Erro ao buscar CEP."
        );

      } finally {

        setBuscandoCEP(false);

      }
    }
  }

  return (

    <div style={{ position: "relative" }}>

      <h4 style={{ marginTop: 8 }}>
        Endereço
      </h4>

      <Spin
        spinning={buscandoCEP}
        tip="Buscando CEP..."
        size="small"
      >

        <Form.Item
          name={["endereco", "cep"]}
          label="CEP"
          rules={[
            {
              required: true,
              message: "Informe o CEP!"
            }
          ]}
        >
          <Input
            placeholder="Somente números"
            maxLength={8}
            onChange={handleCepChange}
          />
        </Form.Item>

        <Form.Item
          name={["endereco", "logradouro"]}
          label="Logradouro"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["endereco", "bairro"]}
          label="Bairro"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["endereco", "cidade"]}
          label="Cidade"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["endereco", "uf"]}
          label="UF"
        >
          <Select
            showSearch
            placeholder="Selecione"
            options={
              UFS.map((uf) => ({
                value: uf,
                label: uf
              }))
            }
            onChange={(uf) => {

              const atual =
                form.getFieldValue("endereco")
                || {};

              form.setFieldsValue({

                endereco: {
                  ...atual,
                  uf,
                  regiao:
                    obterRegiao(uf)
                }
              });
            }}
          />
        </Form.Item>

        <Form.Item
          name={["endereco", "regiao"]}
          label="Região"
        >
          <Input disabled />
        </Form.Item>

      </Spin>

    </div>
  );
}