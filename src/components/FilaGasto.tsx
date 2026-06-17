import type { ExpenseResponse, ExpenseType } from '../types/gastos';

function formatearFecha(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatearMonto(amount: number): string {
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function tipoLabel(type: ExpenseType): string {
  return type === 0 ? 'FIXED' : 'VARIABLE';
}

function tipoClase(type: ExpenseType): string {
  return type === 0 ? 'fija' : 'variable';
}

interface Props {
  gasto: ExpenseResponse;
}

export default function FilaGasto({ gasto }: Props) {
  return (
    <div class="tabla__fila">
      <span class="tabla__celda tabla__celda--fecha">{formatearFecha(gasto.date)}</span>
      <div>
        <span class="tabla__celda">{gasto.description || '—'}</span>
      </div>
      <span class="tabla__celda">{gasto.categoryName}</span>
      <span class={`tabla__etiqueta tabla__etiqueta--${tipoClase(gasto.type)}`}>{tipoLabel(gasto.type)}</span>
      <span class="tabla__celda tabla__celda--monto">
        <span class="tabla__celda--monto-prefijo">$</span>
        {formatearMonto(gasto.amount).slice(1)}
      </span>
    </div>
  );
}
