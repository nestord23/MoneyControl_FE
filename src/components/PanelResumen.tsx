import TarjetaResumen from './TarjetaResumen';
import GraficoPulso from './GraficoPulso';

export default function PanelResumen() {
  return (
    <aside class="panel-resumen">
      <TarjetaResumen etiqueta="Total Fixed" valor="$14,490.00" variante="fixed" />
      <TarjetaResumen etiqueta="Total Variable" valor="$3,425.50" variante="variable" />
      <TarjetaResumen etiqueta="Total Gastos" valor="$17,915.50" variante="total" />
      <GraficoPulso />
    </aside>
  );
}
