import React, { useState } from 'react';
import ArticleList from './ArticleList';

const usuarios = [
  { id: 1, nombre: 'Juan', correo: 'juan@mail.com' },
  { id: 2, nombre: 'Maria', correo: 'maria@mail.com' },
];

const articulos = [
  { id: 1, nombre: 'Libro de matemáticas', id_usuario: 1 },
  { id: 2, nombre: 'Bicicleta', id_usuario: 1 },
  { id: 3, nombre: 'Juego de mesa', id_usuario: 2 },
  { id: 4, nombre: 'Auriculares', id_usuario: 2 },
];

function UserList() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      {usuarios.map(u => (
        <div key={u.id} className="user-card">
          <strong>{u.nombre}</strong> ({u.correo})
          <button style={{ marginLeft: '10px' }} onClick={() => setSelectedUser(u)}>
            Ver artículos
          </button>
        </div>
      ))}
      {selectedUser && (
        <ArticleList
          user={selectedUser}
          articulos={articulos.filter(a => a.id_usuario === selectedUser.id)}
        />
      )}
    </div>
  );
}

export default UserList;
