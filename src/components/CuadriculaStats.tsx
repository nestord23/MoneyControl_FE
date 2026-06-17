import TarjetaStats from './TarjetaStats';

export interface StatCard {
  titulo: string;
  valor: string;
  variante: 'primary' | 'secondary' | 'alert';
  icono: 'trending-up' | 'trending-down' | 'activity' | 'dollar-sign';
}

interface Props {
  stats: StatCard[];
  loading?: boolean;
}

export default function CuadriculaStats({ stats, loading }: Props) {
  if (loading) {
    return (
      <div class="cuadricula-stats">
        {[1, 2, 3, 4].map(i => (
          <article class="tarjeta tarjeta--destacado" key={i}>
            <div class="tarjeta__encabezado">
              <span class="tarjeta__etiqueta">CARGANDO...</span>
            </div>
          </article>
        ))}
      </div>
    );
  }
  return (
    <div class="cuadricula-stats">
      {stats.map((t, i) => (
        <TarjetaStats key={i} titulo={t.titulo} valor={t.valor} variante={t.variante} icono={t.icono} />
      ))}
    </div>
  );
}
