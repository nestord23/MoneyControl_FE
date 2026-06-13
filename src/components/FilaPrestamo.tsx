export interface PrestamoAPI {
  loanName: string;
  totalAmount: number;
  remainingBalance: number;
  interestRate: number;
  nextDueDate: string;
  status: 'ACTIVE' | 'PAID' | 'OVERDUE';
}

function formatearMonto(amount: number): string {
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatearFecha(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

interface Props {
  prestamo: PrestamoAPI;
}

export default function FilaPrestamo({ prestamo }: Props) {
  const claseEstado = prestamo.status === 'ACTIVE' ? 'activo'
    : prestamo.status === 'PAID' ? 'pagado' : 'atrasado';
  const textoEstado = prestamo.status === 'ACTIVE' ? 'ACTIVE'
    : prestamo.status === 'PAID' ? 'PAID' : 'OVERDUE';

  return (
    <div class="fila-prestamo animar-conteo">
      <div class="fila-prestamo__info">
        <span class="fila-prestamo__nombre">{prestamo.loanName}</span>
        <div class="fila-prestamo__barra">
          <div class="fila-prestamo__barra-lleno"></div>
        </div>
      </div>
      <span class={`fila-prestamo__balance${prestamo.status === 'PAID' ? ' fila-prestamo__balance-pagado' : ''}`}>
        {formatearMonto(prestamo.remainingBalance)}
      </span>
      <span class="fila-prestamo__tasa">{prestamo.interestRate}%</span>
      <span class="fila-prestamo__fecha">{formatearFecha(prestamo.nextDueDate)}</span>
      <span class={`tabla__estado tabla__estado--${claseEstado}`}>{textoEstado}</span>
    </div>
  );
}
