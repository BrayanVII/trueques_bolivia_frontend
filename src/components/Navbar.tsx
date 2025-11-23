import { useState } from 'react';
import { Menu, X, Home, Bell, Mail, User } from 'lucide-react';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg group-hover:shadow-lg transition">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 1v6h8V1H8zm-3 8v6h4V9H5zm6 0v6h4V9h-4zm6 0v6h4V9h-4z"/>
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Trueques
            </span>
          </div>

          {/* Búsqueda - Desktop */}
          <div className="hidden md:flex flex-1 mx-8">
            <input
              type="text"
              placeholder="Buscar artículos..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Iconos - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Mail className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Menú Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menú Mobile Desplegable */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t">
            <input
              type="text"
              placeholder="Buscar artículos..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 mt-4"
            />
            <div className="flex flex-col gap-2 mt-4">
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition">
                <Home className="w-5 h-5" />
                Inicio
              </button>
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition">
                <Bell className="w-5 h-5" />
                Notificaciones
              </button>
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition">
                <User className="w-5 h-5" />
                Perfil
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}