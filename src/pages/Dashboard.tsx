import GraficoPrincipal from '../components/GraficoPrincipal';
import MetricasHero from '../components/MetricasHero';
import CuadriculaStats from '../components/CuadriculaStats';
import RegistroActividad from '../components/RegistroActividad';

export default function Dashboard() {
  return (
    <div class="pagina-dashboard">
      <MetricasHero />
      <CuadriculaStats />
      <div class="pagina-dashboard__contenido">
        <GraficoPrincipal />
        <RegistroActividad />
      </div>
    </div>
  );
}
