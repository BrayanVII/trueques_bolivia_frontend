import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { ArticleList } from '../components/ArticleList';
import { Sidebar } from '../components/Sidebar';
import type { Articulo } from '../types';

// Definición del tipo Filters
interface Filters {
  categorias: string[];
  estados: string[];
  ratingMin: number;
}

// ✨ DATOS DIRECTAMENTE EN EL COMPONENTE
const ARTICULOS: Articulo[] = [
  {
    id: '1',
    nombre: 'Bicicleta de Montaña Trek',
    descripcion: 'Bicicleta en excelente estado, poco uso. Perfecta para principiantes y intermedios.',
    imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop',
    categoria: 'Deportes',
    estado: 'disponible',
    usuario: {
      id: '1',
      nombre: 'Juan Pérez',
      email: 'juan@email.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      ubicacion: 'La Paz, Bolivia',
      rating: 4.8,
      articulosDisponibles: 5,
      articulosIntercambiados: 12,
      verificado: true,
      descripcion: 'Amante del intercambio. Rápido y confiable.',
    },
    fechaPublicacion: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    vistas: 45,
    interes: 3,
  },
  {
    id: '2',
    nombre: 'Laptop Dell XPS 13',
    descripcion: 'Laptop ultrabooks, 16GB RAM, SSD 512GB. Perfecta para programación y diseño.',
    imagen: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop',
    categoria: 'Tecnología',
    estado: 'disponible',
    usuario: {
      id: '2',
      nombre: 'María García',
      email: 'maria@email.com',
      avatar: 'https://i.pravatar.cc/150?img=2',
      ubicacion: 'La Paz, Bolivia',
      rating: 4.9,
      articulosDisponibles: 8,
      articulosIntercambiados: 25,
      verificado: true,
      descripcion: 'Vendedora de ropa y accesorios.',
    },
    fechaPublicacion: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    vistas: 89,
    interes: 7,
  },
  // ... resto de los artículos como antes
];

export function Home() {
  const [filters, setFilters] = useState<Filters>({
    categorias: [],
    estados: ['Disponible'],
    ratingMin: 0,
  });

  const articulosFiltrados = ARTICULOS.filter((art) => {
    const cumpleCategoria = filters.categorias.length === 0 || filters.categorias.includes(art.categoria);
    const cumpleEstado = filters.estados.includes(
      art.estado.charAt(0).toUpperCase() + art.estado.slice(1)
    );
    const cumpleRating = art.usuario.rating >= filters.ratingMin;

    return cumpleCategoria && cumpleEstado && cumpleRating;
  });

  const handleArticleClick = (articulo: Articulo) => {
    console.log('Artículo seleccionado:', articulo);
    // Aquí irá la navegación a detalles del artículo
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ¿Qué estás buscando hoy?
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Intercambia tus artículos y encuentra lo que necesitas en tu comunidad
          </p>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar onFilterChange={setFilters} />
          </div>

          {/* Artículos */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Artículos Disponibles
              </h2>
              <p className="text-gray-600">
                Mostrando {articulosFiltrados.length} de {ARTICULOS.length} artículos
              </p>
            </div>

            <ArticleList
              articulos={articulosFiltrados}
              onArticleClick={handleArticleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
