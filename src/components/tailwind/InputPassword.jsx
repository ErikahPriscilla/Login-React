import React, { useState } from 'react';

export default function InputPassword({ placeholder }) {
  const [senha, setSenha] = useState("");

  return (
    <div className="flex flex-col mb-3">
      <input
        type="password"
        placeholder={placeholder}
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-green-600 focus:ring-1 focus:ring-green-400 outline-none"
      />
      {senha !== "" && (
        <p className="text-sm text-gray-600 italic mt-1">
          Senha digitada: {senha}
        </p>
      )}
    </div>
  );
}