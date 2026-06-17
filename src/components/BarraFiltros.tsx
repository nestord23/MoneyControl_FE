import type { CategoryResponse } from '../types/categorias';

interface Props {
  categories: CategoryResponse[];
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
}

export default function BarraFiltros({ categories, selectedCategory, onCategoryChange }: Props) {
  return (
    <div class="barra-filtros">
      <select class="select--oscuro" value={selectedCategory ?? ''} onChange={e => {
        const val = (e.target as HTMLSelectElement).value;
        onCategoryChange(val ? Number(val) : null);
      }}>
        <option value="">Todas las categorías</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <button class="boton-filtros">
        <svg class="boton-filtros__icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
        Filtros
      </button>
    </div>
  );
}
