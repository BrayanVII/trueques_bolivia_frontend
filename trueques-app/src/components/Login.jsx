import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';

// Agregamos el rol a cada usuario
const usuariosMock = [
  { id: 1, nombre: 'Brayan', correo: 'brayan@gmail.com', rol: 'Administrador' },
  { id: 2, nombre: 'Fernando', correo: 'fernando@gmail.com', rol: 'Usuario' },
];

function Login({ setUser }) {
  const [correo, setCorreo] = useState('');

  const handleLogin = () => {
    // Comparación case-insensitive
    const foundUser = usuariosMock.find(
      (u) => u.correo.toLowerCase() === correo.toLowerCase()
    );
    if (foundUser) {
      setUser(foundUser); // ahora incluye el rol
    } else {
      alert('Usuario no encontrado');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <FaEnvelope
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#007bff',
            fontSize: '1.1rem',
          }}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 12px 12px 40px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <button
        onClick={handleLogin}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: 'none',
          background: 'linear-gradient(90deg, #007bff, #00c6ff)',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: '0.3s',
          fontSize: '1rem',
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.background =
            'linear-gradient(90deg, #0056b3, #0096ff)')
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.background =
            'linear-gradient(90deg, #007bff, #00c6ff)')
        }
      >
        Iniciar sesión
      </button>
    </div>
  );
}

export default Login;


