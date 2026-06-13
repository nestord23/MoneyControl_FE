export default function CabeceraIngresos() {
  return (
    <header class="cabecera-ingresos">
      <div>
        <h1 class="cabecera-ingresos__titulo">Income Stream</h1>
        <p class="cabecera-ingresos__subtitulo">Registro centralizado de ingresos — Uptime: 127d 14h 32m</p>
      </div>
      <button class="boton--exito" id="btn-registrar-ingreso">
        <svg class="boton--exito__icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
        Registrar Ingreso
      </button>
    </header>
  );
}
