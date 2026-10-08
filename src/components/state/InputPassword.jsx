import React, { useState } from 'react';

export default function InputPassword({ placeholder }) {
  const [senha, setSenha] = useState('');

  function handleChange(e) {
    setSenha(e.target.value);
  }

  return (
    <>
      <input
        type="password"
        placeholder={placeholder}
        value={senha}
        onChange={handleChange}
      />

      {senha !== '' && <p>Senha digitada: {senha}</p>}
    </>
  );
}
