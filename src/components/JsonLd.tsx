// src/components/JsonLd.tsx
import React from 'react';

interface JsonLdProps {
  data: object;
}

const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0)
      }}
    />
  );
};

export default JsonLd;
