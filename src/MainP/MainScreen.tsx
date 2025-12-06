import { useState } from "react";
import LoginForm from "../components/LoginForm";
import "./MainScreen.css"; // Opcional, si quieres estilos separados

export function MainScreen() {
  const [showLogin, setShowLogin] = useState(false);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState<any>(null); // Puedes usar tu tipo UsuarioAutenticado

  const handleLogin = (usuario: any) => {
    setUsuarioAutenticado(usuario);
    console.log("Usuario autenticado:", usuario);
    setShowLogin(false); // Cierra el modal al iniciar sesión
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-600">TRUEQUES BOLIVIA</h1>
        {!usuarioAutenticado && (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => setShowLogin(true)}
          >
            Iniciar Sesión
          </button>
        )}
        {usuarioAutenticado && (
          <div className="text-gray-700 font-medium">
            Hola, {usuarioAutenticado.nombre}
          </div>
        )}
      </header>

      {/* Sección principal */}
      <main className="flex flex-col items-center justify-center flex-1 w-full px-8">
        <h2 className="text-4xl font-bold text-center mt-16 mb-8">
          Bienvenido a Trueques Bolivia
        </h2>
        <p className="text-center text-gray-700 mb-12 max-w-2xl">
          Intercambia productos y servicios de manera fácil y segura con nuestra
          comunidad.
        </p>

        {/* Galería tipo collage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <img src="/images/collage1.jpg" alt="Collage 1" className="rounded shadow" />
          <img src="/images/collage2.jpg" alt="Collage 2" className="rounded shadow" />
          <img src="/images/collage3.jpg" alt="Collage 3" className="rounded shadow" />
          <img src="/images/collage4.jpg" alt="Collage 4" className="rounded shadow" />
          <img src="/images/collage5.jpg" alt="Collage 5" className="rounded shadow" />
          <img src="/images/collage6.jpg" alt="Collage 6" className="rounded shadow" />
        </div>
      </main>

      {/* Modal de Login */}
      {showLogin && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowLogin(false)} // Cierra al hacer click fuera
        >
          <div
            className="bg-white rounded-lg p-8 relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer click dentro
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowLogin(false)}
            >
              X
            </button>
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      )}
    </div>
  );
}
