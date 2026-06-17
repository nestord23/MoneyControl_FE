import TarjetaCategoria from './TarjetaCategoria';
import type { CategoryResponse } from '../types/categorias';

interface Props {
  categories: CategoryResponse[];
  loading?: boolean;
  onEdit?: (category: CategoryResponse) => void;
  onDelete?: (id: number) => void;
}

export default function CuadriculaCategorias({ categories, loading, onEdit, onDelete }: Props) {
  return (
    <div class="cuadricula-categorias">
      {loading ? (
        <p>Cargando categorías...</p>
      ) : categories.length === 0 ? (
        <p>Sin categorías registradas</p>
      ) : (
        categories.map((c) => (
          <TarjetaCategoria key={c.id} category={c} onEdit={onEdit} onDelete={onDelete} />
        ))
      )}
    </div>
  );
}
