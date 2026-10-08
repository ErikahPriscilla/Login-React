import React, { useState } from 'react';

export default function LabelTitle({ texto }) {
  const [valor] = useState(texto);

  return (
    <label className="block text-2xl font-bold text-blue-800 mb-4 text-center">
      {valor}
    </label>
  );
}
