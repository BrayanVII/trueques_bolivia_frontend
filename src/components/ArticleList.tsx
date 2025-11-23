import type { Articulo } from '../types'; // 👈 import tipo-only
import { ArticleCard } from './ArticleCard';

interface ArticleListProps {
  articulos: Articulo[];
  onArticleClick?: (articulo: Articulo) => void;
}

export function ArticleList({ articulos = [], onArticleClick }: ArticleListProps) {
  if (!articulos.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No hay artículos disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {articulos.map((articulo) => (
        <ArticleCard
          key={articulo.id}
          articulo={articulo}
          onClick={() => onArticleClick?.(articulo)}
        />
      ))}
    </div>
  );
}
