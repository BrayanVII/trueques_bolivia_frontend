import React, { useState } from "react";
import { usuariosMock as initialUsuarios } from "../data/usuariosMock";

export default function UserList() {
  const [usuarios, setUsuarios] = useState(initialUsuarios);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ nombre: "", correo: "", rol: "" });

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setForm(user);
    } else {
      setEditingUser(null);
      setForm({ nombre: "", correo: "", rol: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      
      setUsuarios(
        usuarios.map((u) => (u.id === editingUser.id ? { ...form, id: u.id } : u))
      );
    } else {
      
      const newUser = { ...form, id: Date.now() };
      setUsuarios([...usuarios, newUser]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
      setUsuarios(usuarios.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">👥 Lista de Usuarios</h2>
      <button
        onClick={() => handleOpenModal()}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        ➕ Nuevo Usuario
      </button>

      <table className="w-full mt-4 border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Correo</th>
            <th className="border p-2">Rol</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id} className="text-center">
              <td className="border p-2">{u.id}</td>
              <td className="border p-2">{u.nombre}</td>
              <td className="border p-2">{u.correo}</td>
              <td className="border p-2">{u.rol}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleOpenModal(u)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  🗑 Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96 shadow-lg">
            <h3 className="text-lg font-bold mb-3">
              {editingUser ? "Editar Usuario" : "Nuevo Usuario"}
            </h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full border p-2 mb-2"
                required
              />
              <input
                type="email"
                name="correo"
                placeholder="Correo"
                value={form.correo}
                onChange={handleChange}
                className="w-full border p-2 mb-2"
                required
              />
              <input
                type="text"
                name="rol"
                placeholder="Rol"
                value={form.rol}
                onChange={handleChange}
                className="w-full border p-2 mb-4"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-400 px-3 py-1 rounded text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-600 px-3 py-1 rounded text-white"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
