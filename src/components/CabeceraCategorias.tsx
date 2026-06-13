import BuscadorCategorias from './BuscadorCategorias';

export default function CabeceraCategorias() {
  return (
    <header class="cabecera-ingresos">
      <div>
        <h1 class="cabecera-ingresos__titulo">Categories Management</h1>
        <p class="cabecera-ingresos__subtitulo">Gestión de categorías de ingresos y gastos — Sistema de clasificación</p>
      </div>
      <div class="cabecera-ingresos__acciones">
        <BuscadorCategorias />
        <button class="boton--primario" id="btn-nueva-categoria">
          <svg class="boton--primario__icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nueva Categoría
        </button>
      </div>
    </header>
  );
}
