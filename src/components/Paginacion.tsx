function rangoPaginas(paginaActual: number, totalPaginas: number): number[] {
  const rango: number[] = [];
  const inicio = Math.max(1, paginaActual - 2);
  const fin = Math.min(totalPaginas, paginaActual + 2);
  for (let i = inicio; i <= fin; i++) {
    rango.push(i);
  }
  return rango;
}

export default function Paginacion() {
  const paginaActual = 1;
  const totalPaginas = 8;
  const paginas = rangoPaginas(paginaActual, totalPaginas);

  return (
    <div class="paginacion">
      <div class="paginacion__controles">
        <button class="paginacion__boton paginacion__boton--icono">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {paginas.map((p) => (
          <button class={`paginacion__boton${p === paginaActual ? ' paginacion__boton--activo' : ''}`}>
            {p}
          </button>
        ))}

        <button class="paginacion__boton paginacion__boton--icono">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <span class="paginacion__info">Página {paginaActual} de {totalPaginas}</span>
    </div>
  );
}
