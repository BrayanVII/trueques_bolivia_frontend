// cSpell:ignore Articulo articulo hace días Imagen semanas
import type { Articulo } from '../types';
import { Heart, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';

interface ArticleCardProps {
  articulo: Articulo;
  onClick?: () => void;
}

export function ArticleCard({ articulo, onClick }: ArticleCardProps) {
  const [liked, setLiked] = useState(false);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Hoy';
    if (days === 1) return 'Ayer';
    if (days < 7) return `hace ${days} días`;
    return `hace ${Math.floor(days / 7)} semanas`;
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
    >
      {/* Imagen del artículo */}
      <div className="relative overflow-hidden h-48 bg-gray-200">
        <img
          src={articulo.imagen}
          alt={articulo.nombre}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Badge de estado */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
              articulo.estado === 'disponible' ? 'bg-green-500' : 'bg-gray-500'
            }`}
          >
            {articulo.estado}
          </span>
        </div>

        {/* Botón Like */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition"
        >
          <Heart
            className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </button>

        {/* Número de vistas */}
        <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
          👁 {articulo.vistas} vistas
        </div>
      </div>

      {/* Contenido del artículo */}
      <div className="p-4">
        {/* Categoría */}
        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
          {articulo.categoria}
        </div>

        {/* Título */}
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2">
          {articulo.nombre}
        </h3>

        {/* Descripción */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{articulo.descripcion}</p>

        {/* Fecha de publicación */}
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
          <Calendar className="w-4 h-4" />
          {formatDate(new Date(articulo.fechaPublicacion))}
        </div>

        {/* Información del usuario */}
        <div className="border-t pt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={articulo.usuario.avatar}
              alt={articulo.usuario.nombre}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">{articulo.usuario.nombre}</p>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gray-500" />
                <p className="text-xs text-gray-500">{articulo.usuario.ubicacion}</p>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-lg font-bold text-yellow-500">
              ★ {articulo.usuario.rating}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
