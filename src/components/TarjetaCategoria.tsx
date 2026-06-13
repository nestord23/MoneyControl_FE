interface Props {
  id: string;
  name: string;
  iconKey: string;
  variant: string;
  transactionCount: number;
  totalBudget: number;
}

function formatearMonto(amount: number): string {
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function iconoPath(iconKey: string): string {
  const map: Record<string, string> = {
    zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    users: 'M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
    truck: 'M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
    tool: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z',
    'trending-up': 'M23 6l-9.5 9.5-5-5L1 18',
    megaphone: 'M3 11l3-9h12l3 9M3 11l2 10h4l-1-5M3 11h18M11 21h4',
    'dollar-sign': 'M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6',
    shopping: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
  };
  return map[iconKey] || map.zap;
}

export default function TarjetaCategoria({ id, name, iconKey, variant, transactionCount, totalBudget }: Props) {
  return (
    <article class={`tarjeta-categoria tarjeta-categoria--color-${variant}`} data-name={name}>
      <div class="tarjeta-categoria__encabezado">
        <div class="tarjeta-categoria__icono">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d={iconoPath(iconKey)} />
          </svg>
        </div>
        <div class="tarjeta-categoria__led"></div>
      </div>

      <span class="tarjeta-categoria__nombre">{name}</span>

      <div class="tarjeta-categoria__mini-barras">
        <div class="tarjeta-categoria__mini-barra tarjeta-categoria__mini-barra--alta"></div>
        <div class="tarjeta-categoria__mini-barra tarjeta-categoria__mini-barra--alta"></div>
        <div class="tarjeta-categoria__mini-barra"></div>
        <div class="tarjeta-categoria__mini-barra tarjeta-categoria__mini-barra--alta"></div>
        <div class="tarjeta-categoria__mini-barra"></div>
        <div class="tarjeta-categoria__mini-barra tarjeta-categoria__mini-barra--alta"></div>
      </div>

      <div class="tarjeta-categoria__stats">
        <div class="tarjeta-categoria__stats-item">
          <span>Transacciones</span>
          <span class="tarjeta-categoria__stats-valor">{transactionCount}</span>
        </div>
        <div class="tarjeta-categoria__stats-item">
          <span>Presupuesto</span>
          <span class="tarjeta-categoria__stats-valor">{formatearMonto(totalBudget)}</span>
        </div>
      </div>

      <div class="tarjeta-categoria__acciones">
        <button class="tarjeta-categoria__accion tarjeta-categoria__accion--editar">EDIT</button>
        <button class="tarjeta-categoria__accion tarjeta-categoria__accion--borrar">DELETE</button>
      </div>
    </article>
  );
}
