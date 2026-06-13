interface Transaccion {
  descripcion: string;
  fecha: string;
  monto: string;
  tipo: 'ingreso' | 'gasto';
  icono: string;
}

const transacciones: Transaccion[] = [
  { descripcion: 'Transferencia recibida — Cliente XYZ', fecha: 'Hoy, 14:32', monto: '+$4,250.00', tipo: 'ingreso', icono: 'arrow-down' },
  { descripcion: 'Pago de nómina', fecha: 'Hoy, 11:00', monto: '-$8,400.00', tipo: 'gasto', icono: 'users' },
  { descripcion: 'Pago factura servicios', fecha: 'Ayer, 09:15', monto: '-$1,230.00', tipo: 'gasto', icono: 'file-text' },
  { descripcion: 'Depósito inversión', fecha: 'Ayer, 08:00', monto: '+$12,000.00', tipo: 'ingreso', icono: 'trending-up' },
  { descripcion: 'Compra proveedor', fecha: '12 Jun, 16:45', monto: '-$3,450.00', tipo: 'gasto', icono: 'shopping-cart' },
];

function IconoTransaccion({ icono }: { icono: string }) {
  const paths: Record<string, JSX.Element> = {
    'arrow-down': (
      <>
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
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
  };

  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      {paths[icono]}
    </svg>
  );
}

export default function RegistroActividad() {
  return (
    <section class="registro-actividad">
      <h2 class="registro-actividad__encabezado">Actividad Reciente</h2>
      <div class="registro-actividad__lista">
        {transacciones.map((t, i) => (
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
        ))}
      </div>
    </section>
  );
}
