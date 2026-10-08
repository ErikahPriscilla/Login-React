import './InputText.css';
import React, { useState } from 'react';

export default function InputText({ placeholder }) {
  const [valor, setValor] = useState('');
  const [erro, setErro] = useState(false);

  function handleChange(e) {
    const novoValor = e.target.value;

    setValor(novoValor);
    setErro(novoValor.trim() === '');
  }

  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        value={valor}
        onChange={handleChange}
      />

      {erro && <p>⚠️ O campo não pode ficar vazio.</p>}
    </>
  );
}
