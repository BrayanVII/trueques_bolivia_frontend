import React from 'react';
import UserList from '../components/UserList';
import { FaSignOutAlt, FaUsers, FaBoxOpen } from 'react-icons/fa';

function Dashboard({ user, setUser }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-orange-200 p-10 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-gray-800 text-xl">Hola, {user.nombre}</h2>
        <button
          onClick={() => setUser(null)}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <FaSignOutAlt /> Cerrar sesión
        </button>
      </div>

      {/* Contenido principal */}
      <div className="mt-10 space-y-6">
        {/* Funciones solo para Administrador */}
        {user.rol === 'Administrador' && (
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="text-blue-600 text-lg flex items-center gap-2">
              <FaUsers /> Lista de usuarios registrados
            </h3>
            <UserList />
          </div>
        )}

        {/* Funciones para todos los usuarios */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="text-green-600 text-lg flex items-center gap-2">
            <FaBoxOpen /> Artículos disponibles para intercambiar
          </h3>
          <ul className="list-none p-0 mt-2 space-y-2">
            <li className="border-b border-gray-200 pb-1">📘 Libro de matemáticas</li>
            <li className="border-b border-gray-200 pb-1">🚲 Bicicleta</li>
            <li>🎸 Guitarra</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

