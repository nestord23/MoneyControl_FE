interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function rangoPaginas(paginaActual: number, totalPaginas: number): number[] {
  const rango: number[] = [];
  const inicio = Math.max(1, paginaActual - 2);
  const fin = Math.min(totalPaginas, paginaActual + 2);
  for (let i = inicio; i <= fin; i++) {
    rango.push(i);
  }
  return rango;
}

export default function Paginacion({ page, totalPages, onPageChange }: Props) {
  const paginas = rangoPaginas(page, totalPages);

  return (
    <div class="paginacion">
      <div class="paginacion__controles">
        <button
          class="paginacion__boton paginacion__boton--icono"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {paginas.map((p) => (
          <button
            class={`paginacion__boton${p === page ? ' paginacion__boton--activo' : ''}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}

        <button
          class="paginacion__boton paginacion__boton--icono"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <span class="paginacion__info">Página {page} de {totalPages}</span>
    </div>
  );
}
