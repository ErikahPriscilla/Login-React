import React, { useState } from 'react';

export default function Button({ valor }) {
  const [texto, setTexto] = useState(valor);

  function handleClick() {
    setTexto('Você clicou!');
  }

  return (
    <button
      onClick={handleClick}
      className="w-full px-4 py-2 bg-blue-600 text-white text-base rounded-md cursor-pointer hover:bg-blue-800 transition-colors"
    >
      {texto}
    </button>
  );
}
