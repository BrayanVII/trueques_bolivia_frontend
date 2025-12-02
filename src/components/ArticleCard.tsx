import type { Articulo } from '../types';
import { Heart, MapPin, Calendar, Tag, X, User, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface ArticleCardProps {
  articulo: Articulo;
  onClick?: () => void;
}

interface Oferta {
  monto: number;
  mensaje: string;
}

export function ArticleCard({ articulo, onClick }: ArticleCardProps) {
  const [liked, setLiked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [oferta, setOferta] = useState<Oferta>({ monto: 0, mensaje: '' });

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Hoy';
    if (days === 1) return 'Ayer';
    if (days < 7) return `hace ${days} días`;
    return `hace ${Math.floor(days / 7)} semanas`;
  };

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setOferta({ monto: 0, mensaje: '' });
    document.body.style.overflow = 'auto';
  };

  const handleSubmitOferta = (e: React.FormEvent) => {
    e.preventDefault();
    if (oferta.monto <= 0) {
      alert('Por favor ingresa un monto válido');
      return;
    }
    alert(`¡Oferta enviada exitosamente!\n\nProducto: ${articulo.nombre}\nMonto: ${oferta.monto} Bs.\nMensaje: ${oferta.mensaje || 'Sin mensaje'}`);
    handleCloseModal();
  };

  return (
    <>
      <div
        onClick={onClick}
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
      >
        <div className="relative overflow-hidden h-48 bg-gray-200">
          <img
            src={articulo.imagen}
            alt={articulo.nombre}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                articulo.estado === 'disponible' ? 'bg-green-500' : 'bg-gray-500'
              }`}
            >
              {articulo.estado}
            </span>
          </div>
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
          <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
            👁 {articulo.vistas} vistas
          </div>
        </div>
        <div className="p-4">
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
            {articulo.categoria}
          </div>
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2">
            {articulo.nombre}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{articulo.descripcion}</p>
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
            <Calendar className="w-4 h-4" />
            {formatDate(new Date(articulo.fechaPublicacion))}
          </div>
          <div className="border-t pt-3 flex items-center justify-between mb-3">
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
          </div>

          <button
            onClick={handleOpenModal}
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-all font-semibold"
          >
            <Tag size={18} />
            Añadir Oferta
          </button>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex justify-center items-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative animate-slideUp">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition z-10"
            >
              <X size={24} className="text-gray-600" />
            </button>
            <div className="relative h-80 bg-gray-200">
              <img
                src={articulo.imagen}
                alt={articulo.nombre}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold text-white ${
                    articulo.estado === 'disponible' ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                >
                  {articulo.estado}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">
                {articulo.categoria}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{articulo.nombre}</h2>
              <p className="text-gray-700 text-base leading-relaxed mb-6">{articulo.descripcion}</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">👁</div>
                  <div className="text-sm font-semibold text-gray-700">{articulo.vistas}</div>
                  <div className="text-xs text-gray-500">Vistas</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">❤️</div>
                  <div className="text-sm font-semibold text-gray-700">{articulo.interes}</div>
                  <div className="text-xs text-gray-500">Interesados</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">📅</div>
                  <div className="text-sm font-semibold text-gray-700">{formatDate(new Date(articulo.fechaPublicacion))}</div>
                  <div className="text-xs text-gray-500">Publicado</div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <User size={20} className="text-blue-600" />
                  Información del Vendedor
                </h3>
                <div className="flex items-center gap-4">
                  <img
                    src={articulo.usuario.avatar}
                    alt={articulo.usuario.nombre}
                    className="w-16 h-16 rounded-full border-2 border-blue-500"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-bold text-gray-900">{articulo.usuario.nombre}</p>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                      <MapPin className="w-4 h-4" />
                      {articulo.usuario.ubicacion}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>📦 {articulo.usuario.articulosDisponibles} disponibles</span>
                      <span>✅ {articulo.usuario.articulosIntercambiados} intercambios</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t-2 border-gray-200 my-6"></div>
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp size={24} className="text-green-600" />
                  Hacer una Oferta
                </h3>
                <form onSubmit={handleSubmitOferta} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Monto de tu oferta (Bs.)
                    </label>
                    <input
                      type="number"
                      value={oferta.monto || ''}
                      onChange={(e) => setOferta({ ...oferta, monto: Number(e.target.value) })}
                      placeholder="Ej: 500"
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                      required
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mensaje al vendedor (opcional)
                    </label>
                    <textarea
                      value={oferta.mensaje}
                      onChange={(e) => setOferta({ ...oferta, mensaje: e.target.value })}
                      placeholder="Escribe un mensaje personalizado..."
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-100 transition-all font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all font-semibold shadow-lg"
                    >
                      Enviar Oferta
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}