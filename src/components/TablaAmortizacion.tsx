import ListaPrestamos from './ListaPrestamos';
import Paginacion from './Paginacion';

export default function TablaAmortizacion() {
  return (
    <div class="tabla-amortizacion">
      <div class="tabla-amortizacion__cabecera">
        <span class="tabla-amortizacion__item">Préstamo</span>
        <span class="tabla-amortizacion__item">Balance</span>
        <span class="tabla-amortizacion__item">Tasa</span>
        <span class="tabla-amortizacion__item">Próximo Pago</span>
        <span class="tabla-amortizacion__item">Estado</span>
      </div>
      <ListaPrestamos />
      <Paginacion />
    </div>
  );
}
