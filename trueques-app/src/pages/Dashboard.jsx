import React from 'react';
import UserList from '../components/UserList';
import { FaSignOutAlt, FaUsers, FaBoxOpen } from 'react-icons/fa';

function Dashboard({ user, setUser }) {
  return (
    <div
      style={{
        padding: '40px',
        background: 'linear-gradient(135deg, #f1efecff, #fcb69f)',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#fff',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ margin: 0, color: '#333' }}>👋 Hola, {user.nombre}</h2>
        <button
          onClick={() => setUser(null)}
          style={{
            background: '#ff4d4d',
            border: 'none',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FaSignOutAlt /> Cerrar sesión
        </button>
      </div>

      <div style={{ marginTop: '30px' }}>
        <div
          style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            marginBottom: '20px',
          }}
        >
          <h3 style={{ color: '#007bff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaUsers /> lista de Usuarios registrados
          </h3>
          <UserList />
        </div>

        <div
          style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ color: '#28a745', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaBoxOpen /> Artículos disponibles para intercambiar
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>📘 Libro de matemáticas</li>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>🚲 Bicicleta</li>
            <li style={{ padding: '8px 0' }}>🎸 Guitarra</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

