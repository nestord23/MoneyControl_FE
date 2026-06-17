interface Props {
  balance: number;
  loading?: boolean;
}

function formatCurrency(n: number): string {
  const sign = n >= 0 ? '' : '-';
  return `${sign}$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function MetricasHero({ balance, loading }: Props) {
  return (
    <section class="metricas-hero">
      <span class="texto--etiqueta">Balance Global</span>
      <h1 class="texto--dato-xl glow-primary">
        {loading ? 'CARGANDO...' : formatCurrency(balance)}
      </h1>
    </section>
  );
}
