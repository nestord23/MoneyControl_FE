import CabeceraGastos from '../components/CabeceraGastos';
import BarraFiltros from '../components/BarraFiltros';
import TablaGastos from '../components/TablaGastos';
import PanelResumen from '../components/PanelResumen';
import Paginacion from '../components/Paginacion';
import ModalGasto from '../components/ModalGasto';

export default function Gastos() {
  return (
    <div class="pagina-gastos">
      <CabeceraGastos />
      <BarraFiltros />
      <div class="pagina-gastos__contenido">
        <div>
          <TablaGastos />
          <Paginacion />
        </div>
        <PanelResumen />
      </div>
      <ModalGasto />
    </div>
  );
}
