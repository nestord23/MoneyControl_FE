import type { LoanSummaryResponse } from '../types/prestamos';

interface Props {
  summary: LoanSummaryResponse | null;
  loading?: boolean;
}

function formatCurrency(n: number): string {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ResumenPrestamos({ summary, loading }: Props) {
  if (loading || !summary) {
    return (
      <section class="resumen-prestamos">
        <span class="resumen-prestamos__etiqueta">Deuda Total Agregada</span>
        <h1 class="resumen-prestamos__deuda">CARGANDO...</h1>
      </section>
    );
  }

  return (
    <section class="resumen-prestamos">
      <span class="resumen-prestamos__etiqueta">Deuda Total Agregada</span>
      <h1 class="resumen-prestamos__deuda">{formatCurrency(summary.totalPending)}</h1>
      <div class="resumen-prestamos__detalle">
        <span class="resumen-prestamos__detalle-item">
          <span class="resumen-prestamos__detalle-punto resumen-prestamos__detalle-punto--activo"></span>
          {summary.pendingCount} Pendientes
        </span>
        <span class="resumen-prestamos__detalle-item">
          <span class="resumen-prestamos__detalle-punto resumen-prestamos__detalle-punto--pagado"></span>
          {summary.paidCount} Pagados
        </span>
      </div>
    </section>
  );
}
