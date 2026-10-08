import "./Button.css";
import React, { useState } from "react";

export default function Button({ valor }) {

  const [texto, setTexto] = useState(valor);

  function handleClick() {
    setTexto("Você clicou!");
  }

  return (
    <button className="btn" onClick={handleClick}>
      {texto}
    </button>
  );
}