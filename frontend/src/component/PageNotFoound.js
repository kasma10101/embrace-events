import React from 'react';

export default function PageNotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 'bold' }}>404</h1>
      <p style={{ fontSize: '1.5rem' }}>Page Not Found</p>
    </div>
  );
}