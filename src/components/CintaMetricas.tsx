import MetricaMini from './MetricaMini';
import type { IncomeSummaryResponse } from '../types/ingresos';

interface Props {
  summary: IncomeSummaryResponse | null;
  loading?: boolean;
}

function formatCurrency(n: number): string {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CintaMetricas({ summary, loading }: Props) {
  if (loading || !summary) {
    return <div class="cinta-metricas"><p>Cargando métricas...</p></div>;
  }

  return (
    <div class="cinta-metricas">
      <MetricaMini etiqueta="Total Mensual" valor={formatCurrency(summary.totalByMonth)} variacion="Ingresos del mes" positiva={true} />
      <MetricaMini etiqueta="Total Semanal" valor={formatCurrency(summary.totalByWeek)} variacion="Ingresos de la semana" positiva={true} />
      <MetricaMini etiqueta="Proyección Anual" valor={formatCurrency(summary.totalByYear)} variacion="Total acumulado anual" positiva={true} />
    </div>
  );
}
