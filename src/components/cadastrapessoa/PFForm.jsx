import React from 'react';
import { Form, Input, DatePicker } from 'antd';

function PFForm() {
  return (
    <>
      <Form.Item label="Data de Nascimento" name="dataNascimento">
        <DatePicker
          format="DD/MM/YYYY"
          style={{ width: '100%' }}
          placeholder="Selecione data de nascimento"
        />
      </Form.Item>

      <Form.Item label="Título Eleitoral - Número" name={['titulo', 'numero']}>
        <Input placeholder="Número do título" />
      </Form.Item>

      <Form.Item label="Zona" name={['titulo', 'zona']}>
        <Input placeholder="Zona eleitoral" />
      </Form.Item>

      <Form.Item label="Seção" name={['titulo', 'secao']}>
        <Input placeholder="Seção eleitoral" />
      </Form.Item>
    </>
  );
}

export default PFForm;
