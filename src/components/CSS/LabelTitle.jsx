import "./LabelTitle.css";
import React, { useState } from "react";

export default function LabelTitle({ texto }) {

  const [valor, setValor] = useState(texto);

  return (
    <label className="labelTitle">
      {valor}
    </label>
  );
}