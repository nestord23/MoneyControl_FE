import { useEffect } from 'preact/hooks';
import FilaIngreso from './FilaIngreso';
import type { IngresoAPI } from './FilaIngreso';

const ingresos: IngresoAPI[] = [
  { date: '2026-06-12', source: 'Banco', category: 'Transferencia cliente', frequency: 'Recurring', status: 'Received', amount: 12500.00 },
  { date: '2026-06-11', source: 'Crypto', category: 'Cartera BTC', frequency: 'One-time', status: 'Received', amount: 3400.00 },
  { date: '2026-06-11', source: 'Banco', category: 'Pago nómina', frequency: 'Recurring', status: 'Received', amount: 8400.00 },
  { date: '2026-06-10', source: 'Cash', category: 'Venta directa', frequency: 'One-time', status: 'Pending', amount: 2150.00 },
  { date: '2026-06-10', source: 'Banco', category: 'Intereses', frequency: 'Recurring', status: 'Received', amount: 480.00 },
  { date: '2026-06-09', source: 'Crypto', category: 'Cartera ETH', frequency: 'One-time', status: 'Received', amount: 2800.00 },
  { date: '2026-06-09', source: 'Banco', category: 'Servicio consultoría', frequency: 'One-time', status: 'Pending', amount: 5200.00 },
  { date: '2026-06-08', source: 'Cash', category: 'Reembolso', frequency: 'One-time', status: 'Received', amount: 320.00 },
];

export default function TablaIngresos() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fila-aparecer {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      ${ingresos.map((_, i) => `.tabla-datos__cuerpo > .tabla__fila:nth-child(${i + 1}) { animation-delay: ${0.05 * i}s; }`).join('\n')}
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div class="tabla-datos tabla-datos--ingresos">
      <div class="tabla-datos__cabecera">
        <span class="tabla-datos__cabecera-item">Fecha</span>
        <span class="tabla-datos__cabecera-item">Origen</span>
        <span class="tabla-datos__cabecera-item">Categoría</span>
        <span class="tabla-datos__cabecera-item">Frecuencia</span>
        <span class="tabla-datos__cabecera-item">Monto</span>
      </div>
      <div class="tabla-datos__cuerpo">
        {ingresos.map((ingreso, i) => <FilaIngreso key={i} ingreso={ingreso} />)}
      </div>
    </div>
  );
}
