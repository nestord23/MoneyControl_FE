import CabeceraIngresos from '../components/CabeceraIngresos';
import CintaMetricas from '../components/CintaMetricas';
import TablaIngresos from '../components/TablaIngresos';
import PaginacionTerminal from '../components/PaginacionTerminal';
import PanelCrecimiento from '../components/PanelCrecimiento';
import ModalIngreso from '../components/ModalIngreso';

export default function Ingresos() {
  return (
    <div class="pagina-ingresos">
      <CabeceraIngresos />
      <CintaMetricas />
      <div class="pagina-ingresos__contenido">
        <div>
          <TablaIngresos />
          <PaginacionTerminal />
        </div>
        <PanelCrecimiento />
      </div>
      <ModalIngreso />
    </div>
  );
}
