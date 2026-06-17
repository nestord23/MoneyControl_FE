import GraficoPrincipal from '../components/GraficoPrincipal';
import MetricasHero from '../components/MetricasHero';
import CuadriculaStats from '../components/CuadriculaStats';
import RegistroActividad from '../components/RegistroActividad';
import { useDashboardData } from '../hooks/useDashboardData';

export default function Dashboard() {
  const { balance, balanceLoading, stats, statsLoading, chartLabels, chartDatasets, chartLoading, activityItems, activityLoading } = useDashboardData();

  return (
    <div class="pagina-dashboard">
      <MetricasHero balance={balance} loading={balanceLoading} />
      <CuadriculaStats stats={stats} loading={statsLoading} />
      <div class="pagina-dashboard__contenido">
        <GraficoPrincipal labels={chartLabels} datasets={chartDatasets} loading={chartLoading} />
        <RegistroActividad items={activityItems} loading={activityLoading} />
      </div>
    </div>
  );
}
