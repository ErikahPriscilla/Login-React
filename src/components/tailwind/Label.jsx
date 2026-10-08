import React, { useState } from 'react';

export default function Label({ texto }) {
  const [valor] = useState(texto);

  return (
    <label className="block text-base font-medium text-gray-800 mb-1">
      {valor}
    </label>
  );
}
