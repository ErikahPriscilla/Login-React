import React, { useState } from "react";
import { Input, Alert } from "antd";

export default function InputText({ placeholder }) {

  const [valor, setValor] = useState("");
  const [erro, setErro] = useState(false);

  const handleChange = (e) => {

    const novoValor = e.target.value;

    setValor(novoValor);

    setErro(novoValor.trim() === "");
  };

  return (
    <div>

      <Input
        placeholder={placeholder}
        value={valor}
        onChange={handleChange}
        size="large"
        status={erro ? "error" : ""}
      />

      {erro && (
        <Alert
          message="O campo não pode ficar vazio."
          type="error"
          showIcon
          style={{ marginTop: 8 }}
        />
      )}

    </div>
  );
}