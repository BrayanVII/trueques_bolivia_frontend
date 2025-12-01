import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import type { UsuarioAutenticado } from '../types';
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const [usuario, setUsuario] = useState<UsuarioAutenticado | null>(null);

  if (usuario) {
    return usuario.rol === "administrador" ? <Navigate to="/admin" /> : <Navigate to="/usuario" />;
  }

  return <LoginForm onLogin={setUsuario} />;
}
