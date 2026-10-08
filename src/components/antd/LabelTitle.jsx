import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export default function LabelTitle({ texto }) {
  return (
    <Title
      level={2}
      style={{
        color: '#1677ff',
        textAlign: 'center',
        marginBottom: 24,
      }}
    >
      {texto}
    </Title>
  );
}
