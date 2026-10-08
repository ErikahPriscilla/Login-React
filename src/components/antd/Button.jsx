import React, { useState } from 'react';

import { Button as AntButton, message } from 'antd';

export default function Button({ valor }) {
  const [texto, setTexto] = useState(valor);

  const handleClick = () => {
    setTexto('Você clicou!');

    message.success('Botão clicado com sucesso!');
  };

  return (
    <AntButton type="primary" block size="large" onClick={handleClick}>
      {texto}
    </AntButton>
  );
}
