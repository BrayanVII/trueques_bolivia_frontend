import { useState } from 'react';
import { X } from 'lucide-react';

interface SidebarProps {
  onFilterChange?: (filters: Filters) => void;
}

export interface Filters {
  categorias: string[];
  estados: string[];
}

const CATEGORIAS = ['Deportes', 'Tecnología', 'Libros', 'Ropa', 'Hogar', 'Otros'];
const ESTADOS = ['Disponible', 'Pendiente', 'Intercambiado'];

export function Sidebar({ onFilterChange }: SidebarProps) {
  const [filters, setFilters] = useState<Filters>({
    categorias: [],
    estados: ['Disponible'],
  });
  const [openMobile, setOpenMobile] = useState(false);

  const handleCategoriaChange = (categoria: string) => {
    const nuevas = filters.categorias.includes(categoria)
      ? filters.categorias.filter(c => c !== categoria)
      : [...filters.categorias, categoria];
    
    const nuevosFiltros = { ...filters, categorias: nuevas };
    setFilters(nuevosFiltros);
    onFilterChange?.(nuevosFiltros);
  };

  const handleEstadoChange = (estado: string) => {
    const nuevos = filters.estados.includes(estado)
      ? filters.estados.filter(e => e !== estado)
      : [...filters.estados, estado];
    
    const nuevosFiltros = { ...filters, estados: nuevos };
    setFilters(nuevosFiltros);
    onFilterChange?.(nuevosFiltros);
  };

  return (
    <>
      {/* Botón Mobile */}
      <button
        onClick={() => setOpenMobile(!openMobile)}
        className="lg:hidden mb-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
      >
        {openMobile ? 'Cerrar Filtros' : 'Mostrar Filtros'}
      </button>

      {/* Sidebar */}
      <div className={`${
        openMobile ? 'block' : 'hidden'
      } lg:block bg-white rounded-xl p-6 h-fit sticky top-20 shadow-md`}>
        
        {/* Botón cerrar mobile */}
        {openMobile && (
          <button
            onClick={() => setOpenMobile(false)}
            className="lg:hidden absolute top-4 right-4"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Categorías */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🏷️</span> Categorías
          </h3>
          <div className="space-y-2">
            {CATEGORIAS.map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categorias.includes(cat)}
                  onChange={() => handleCategoriaChange(cat)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700 group-hover:text-blue-600 transition">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t my-6"></div>

        {/* Estado */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📊</span> Estado
          </h3>
          <div className="space-y-2">
            {ESTADOS.map((est) => (
              <label key={est} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.estados.includes(est)}
                  onChange={() => handleEstadoChange(est)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700 group-hover:text-blue-600 transition">{est}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Botón limpiar filtros */}
        <button
          onClick={() => {
            setFilters({ categorias: [], estados: ['Disponible'] });
            onFilterChange?.({ categorias: [], estados: ['Disponible'] });
          }}
          className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold transition"
        >
          Limpiar Filtros
        </button>
      </div>
    </>
  );
}