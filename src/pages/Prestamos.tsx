import CabeceraPrestamos from '../components/CabeceraPrestamos';
import ResumenPrestamos from '../components/ResumenPrestamos';
import TablaAmortizacion from '../components/TablaAmortizacion';
import GraficoAmortizacion from '../components/GraficoAmortizacion';
import CalculadoraPagos from '../components/CalculadoraPagos';
import ModalDeuda from '../components/ModalDeuda';

export default function Prestamos() {
  return (
    <div class="pagina-prestamos">
      <CabeceraPrestamos />
      <ResumenPrestamos />
      <div class="pagina-prestamos__contenido">
        <TablaAmortizacion />
        <div class="pagina-prestamos__sidebar">
          <GraficoAmortizacion />
          <CalculadoraPagos />
        </div>
      </div>
      <ModalDeuda />
    </div>
  );
}
