import type { CategoryResponse } from '../types/categorias';

interface Props {
  category: CategoryResponse;
  onEdit?: (category: CategoryResponse) => void;
  onDelete?: (id: number) => void;
}

export default function TarjetaCategoria({ category, onEdit, onDelete }: Props) {
  return (
    <article class="tarjeta-categoria" data-name={category.name}>
      <div class="tarjeta-categoria__encabezado">
        <div class="tarjeta-categoria__icono">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
          </svg>
        </div>
      </div>

      <span class="tarjeta-categoria__nombre">{category.name}</span>
      {category.description && (
        <span class="tarjeta-categoria__descripcion">{category.description}</span>
      )}

      <div class="tarjeta-categoria__acciones">
        {onEdit && (
          <button class="tarjeta-categoria__accion tarjeta-categoria__accion--editar" onClick={() => onEdit(category)}>
            EDIT
          </button>
        )}
        {onDelete && (
          <button class="tarjeta-categoria__accion tarjeta-categoria__accion--borrar" onClick={() => onDelete(category.id)}>
            DELETE
          </button>
        )}
      </div>
    </article>
  );
}
