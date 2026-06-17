import type { ActivityItem } from '../hooks/useRecentActivity';

interface Props {
  items: ActivityItem[];
  loading?: boolean;
}

function IconoTransaccion({ icono }: { icono: string }) {
  const paths: Record<string, JSX.Element> = {
    'trending-up': (
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    ),
    'shopping-cart': (
      <>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    'file-text': (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </>
    ),
    'arrow-down': (
      <>
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </>
    ),
  };

  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      {paths[icono] || paths['trending-up']}
    </svg>
  );
}

export default function RegistroActividad({ items, loading }: Props) {
  return (
    <section class="registro-actividad">
      <h2 class="registro-actividad__encabezado">Actividad Reciente</h2>
      <div class="registro-actividad__lista">
        {loading ? (
          <p class="registro-actividad__cargando">Cargando...</p>
        ) : items.length === 0 ? (
          <p class="registro-actividad__vacio">Sin actividad reciente</p>
        ) : (
          items.map((t, i) => (
            <div class="registro-actividad__item" key={i}>
              <div class="registro-actividad__icono">
                <IconoTransaccion icono={t.icono} />
              </div>
              <div>
                <p class="registro-actividad__descripcion">{t.descripcion}</p>
                <span class="registro-actividad__fecha">{t.fecha}</span>
              </div>
              <span class={`registro-actividad__monto registro-actividad__monto--${t.tipo}`}>
                {t.monto}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
