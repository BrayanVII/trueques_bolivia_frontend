import { useState } from "react";
import LoginForm from "../components/LoginForm";
import type { UsuarioAutenticado } from "../types";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const [usuario, setUsuario] = useState<UsuarioAutenticado | null>(null);

  if (usuario) {
    // 👇 CORREGIDO: Ahora verifica si 'administrador' está en el array de roles
    const esAdministrador = usuario.roles.includes("administrador");
    
    return esAdministrador
      ? <Navigate to="/admin" />
      : <Navigate to="/usuario" />;
  }

  return (
    <LoginForm 
      onLogin={(usuarioLogueado: UsuarioAutenticado) => setUsuario(usuarioLogueado)} 
    />
  );
}