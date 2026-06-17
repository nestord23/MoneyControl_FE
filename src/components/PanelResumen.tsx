import TarjetaResumen from './TarjetaResumen';
import GraficoPulso from './GraficoPulso';
import type { ExpenseSummaryResponse } from '../types/gastos';

interface Props {
  summary: ExpenseSummaryResponse | null;
  loading?: boolean;
}

function formatCurrency(n: number): string {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function PanelResumen({ summary, loading }: Props) {
  if (loading || !summary) {
    return (
      <aside class="panel-resumen">
        <p>Cargando resumen...</p>
      </aside>
    );
  }

  return (
    <aside class="panel-resumen">
      <TarjetaResumen etiqueta="Total Fixed" valor={formatCurrency(summary.totalFixed)} variante="fixed" />
      <TarjetaResumen etiqueta="Total Variable" valor={formatCurrency(summary.totalVariable)} variante="variable" />
      <TarjetaResumen etiqueta="Total Gastos" valor={formatCurrency(summary.totalByMonth)} variante="total" />
      <GraficoPulso />
    </aside>
  );
}
