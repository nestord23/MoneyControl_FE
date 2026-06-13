import TarjetaStats from './TarjetaStats';

const tarjetas = [
  { titulo: 'Ingresos', valor: '+$48,250.00', variante: 'secondary' as const, icono: 'trending-up' as const },
  { titulo: 'Gastos', valor: '-$32,180.00', variante: 'alert' as const, icono: 'trending-down' as const },
  { titulo: 'Ratio', valor: '1.50', variante: 'primary' as const, icono: 'activity' as const },
  { titulo: 'Prestamos Pendientes', valor: '$12,400.00', variante: 'alert' as const, icono: 'dollar-sign' as const },
];

export default function CuadriculaStats() {
  return (
    <div class="cuadricula-stats">
      {tarjetas.map((t, i) => (
        <TarjetaStats key={i} titulo={t.titulo} valor={t.valor} variante={t.variante} icono={t.icono} />
      ))}
    </div>
  );
}
