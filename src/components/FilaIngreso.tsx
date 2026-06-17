import type { IncomeResponse } from '../types/ingresos';

function formatearFecha(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatearMonto(amount: number): string {
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

interface Props {
  ingreso: IncomeResponse;
}

export default function FilaIngreso({ ingreso }: Props) {
  return (
    <div class="tabla__fila">
      <span class="tabla__celda tabla__celda--fecha">{formatearFecha(ingreso.date)}</span>
      <div class="tabla__celda-fuente">
        <span class="tabla__celda">{ingreso.description || '—'}</span>
      </div>
      <span class="tabla__celda tabla__celda--monto-ingreso">
        <span class="tabla__celda--monto-prefijo">$</span>
        {formatearMonto(ingreso.amount).slice(1)}
      </span>
    </div>
  );
}
