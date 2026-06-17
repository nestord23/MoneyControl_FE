import type { LoanResponse, LoanStatus } from '../types/prestamos';

function formatearMonto(amount: number): string {
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatearFecha(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

function statusClase(status: LoanStatus): string {
  return status === 0 ? 'activo' : 'pagado';
}

function statusLabel(status: LoanStatus): string {
  return status === 0 ? 'PENDING' : 'PAID';
}

interface Props {
  prestamo: LoanResponse;
  onMarkAsPaid?: (id: number) => void;
}

export default function FilaPrestamo({ prestamo, onMarkAsPaid }: Props) {
  return (
    <div class="fila-prestamo animar-conteo">
      <div class="fila-prestamo__info">
        <span class="fila-prestamo__nombre">{prestamo.lenderName}</span>
      </div>
      <span class={`fila-prestamo__balance${prestamo.status === 1 ? ' fila-prestamo__balance-pagado' : ''}`}>
        {formatearMonto(prestamo.amount)}
      </span>
      <span class="fila-prestamo__fecha">{formatearFecha(prestamo.date)}</span>
      <span class={`tabla__estado tabla__estado--${statusClase(prestamo.status)}`}>{statusLabel(prestamo.status)}</span>
      {prestamo.status === 0 && onMarkAsPaid && (
        <button class="fila-prestamo__accion" onClick={() => onMarkAsPaid(prestamo.id)}>
          Mark as Paid
        </button>
      )}
    </div>
  );
}
