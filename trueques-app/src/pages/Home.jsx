import React from 'react';
import Login from '../components/Login';
import { FaExchangeAlt } from 'react-icons/fa';

function Home({ setUser }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #6CC1FF, #3A8DFF)',
        padding: '20px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          backgroundColor: '#ffffff',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <h1
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
            color: '#007bff',
            marginBottom: '15px',
            fontSize: '2.5rem',
          }}
        >
          <FaExchangeAlt style={{ fontSize: '3rem' }} />
          Bienvenido a Trueques
        </h1>

        <p
            style={{
            fontSize: '1.1rem',
        color: '#555',
        marginBottom: '30px',
        fontFamily: "'Poppins', sans-serif", 
        fontWeight: '500',
        letterSpacing: '0.5px', 
        }}
        >
        Intercambia lo que no usas por lo que necesitas
        </p>


        <div
          style={{
            backgroundColor: '#f9f9f9',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 6px 10px rgba(0,0,0,0.08)',
          }}
        >
          <Login setUser={setUser} />

          <div style={{ marginTop: '20px' }}>
            <p style={{ fontSize: '0.95rem', color: '#666' }}>
              ¿Nuevo en Trueques?
            </p>
            <button
              style={{
                marginTop: '10px',
                backgroundColor: 'transparent',
                border: '2px solid #007bff',
                color: '#007bff',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#007bff';
                e.target.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#007bff';
              }}
              onClick={() => {
                console.log('Redirigir a página de registro');
              }}
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;




