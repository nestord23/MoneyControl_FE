import MetricaMini from './MetricaMini';

export default function CintaMetricas() {
  return (
    <div class="cinta-metricas">
      <MetricaMini etiqueta="Avg. Monthly Income" valor="$41,250" variacion="+12.4% vs mes anterior" positiva={true} />
      <MetricaMini etiqueta="Projected Annual" valor="$495,000" variacion="+8.2% vs proyección inicial" positiva={true} />
      <MetricaMini etiqueta="Tax Estimation" valor="$98,750" variacion="Estimado 19.95% effective rate" positiva={true} />
    </div>
  );
}
