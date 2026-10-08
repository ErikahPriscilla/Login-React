import React from "react";

import {
  Form,
  Input,
  Button,
  Space
} from "antd";

import {
  MinusCircleOutlined,
  PlusOutlined
} from "@ant-design/icons";

export default function TelefoneListOO() {

  return (
    <>

      <h4 style={{ marginTop: 8 }}>
        Telefones
      </h4>

      <Form.List name="telefones">

        {(fields, { add, remove }) => (
          <>

            {fields.map(
              ({ key, name, ...rest }) => (

                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8
                  }}
                  align="baseline"
                >

                  <Form.Item
                    {...rest}
                    name={[name, "ddd"]}
                    rules={[
                      {
                        required: true,
                        message: "DDD obrigatório"
                      }
                    ]}
                  >
                    <Input
                      placeholder="DDD"
                      style={{ width: 90 }}
                      maxLength={2}
                    />
                  </Form.Item>

                  <Form.Item
                    {...rest}
                    name={[name, "numero"]}
                    rules={[
                      {
                        required: true,
                        message: "Número obrigatório"
                      }
                    ]}
                  >
                    <Input
                      placeholder="Número"
                      style={{ width: 200 }}
                      maxLength={9}
                    />
                  </Form.Item>

                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                  />

                </Space>
              )
            )}

            <Form.Item>

              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
                block
              >
                Adicionar Telefone
              </Button>

            </Form.Item>

          </>
        )}

      </Form.List>

    </>
  );
}