export default function PaginacionTerminal() {
  const paginaActual = 1;
  const totalPaginas = 5;

  return (
    <div class="paginacion-terminal">
      <div class="paginacion-terminal__prompt">
        <span class="paginacion-terminal__symbol">❯</span>
        <span>Page</span>
        <input class="paginacion-terminal__input" type="text" value={paginaActual} readOnly />
        <span>of {totalPaginas}</span>
      </div>
      <div class="paginacion-terminal__navegacion">
        <button class="paginacion-terminal__boton paginacion-terminal__boton--desactivado">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button class="paginacion-terminal__boton">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
