import { useEffect, useRef } from 'preact/hooks';
import Chart from 'chart.js/auto';
import type { ChartDataset } from '../hooks/useDashboardChart';

interface Props {
  labels: string[];
  datasets: ChartDataset[];
  loading?: boolean;
}

export default function GraficoPrincipal({ labels, datasets, loading }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (loading || !datasets.length) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gradientIngresos = ctx.createLinearGradient(0, 0, 0, 240);
    gradientIngresos.addColorStop(0, 'rgba(0, 255, 136, 0.15)');
    gradientIngresos.addColorStop(1, 'rgba(0, 255, 136, 0)');

    const gradientGastos = ctx.createLinearGradient(0, 0, 0, 240);
    gradientGastos.addColorStop(0, 'rgba(255, 68, 102, 0.15)');
    gradientGastos.addColorStop(1, 'rgba(255, 68, 102, 0)');

    const chartData = {
      labels,
      datasets: datasets.map((ds, i) => ({
        label: ds.label,
        data: ds.data,
        borderColor: ds.borderColor,
        backgroundColor: i === 0 ? gradientIngresos : gradientGastos,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: ds.borderColor,
        pointHoverBorderColor: ds.borderColor,
        fill: true,
        tension: 0.4,
      })),
    };

    const chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(14, 20, 23, 0.9)',
            titleFont: { family: 'Geist', weight: '500' },
            bodyFont: { family: 'Geist Mono', weight: '400' },
            borderColor: 'rgba(255, 255, 255, 0.05)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 6,
            titleColor: 'rgba(255,255,255,0.5)',
            bodyColor: 'rgba(255,255,255,0.85)',
            displayColors: true,
            boxPadding: 4,
          },
        },
        scales: {
          x: {
            display: true,
            grid: { display: false },
            ticks: {
              font: { family: 'Geist', weight: '400', size: 11 },
              color: 'rgba(255,255,255,0.25)',
              maxRotation: 0,
            },
          },
          y: {
            display: true,
            grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
            ticks: {
              font: { family: 'Geist Mono', weight: '400', size: 11 },
              color: 'rgba(255,255,255,0.25)',
              padding: 8,
              callback: (value: number) => {
                if (value >= 1000) return '$' + (value / 1000).toFixed(0) + 'k';
                return '$' + value;
              },
            },
            beginAtZero: true,
          },
        },
        interaction: { intersect: false, mode: 'index' },
      },
    });

    return () => chart.destroy();
  }, [labels, datasets, loading]);

  if (loading) {
    return <section class="grafico-principal"><p>Cargando gráfico...</p></section>;
  }

  return (
    <section class="grafico-principal">
      <div class="grafico-principal__encabezado">
        <h2 class="grafico-principal__titulo">Cash Flow Analysis</h2>
        <span class="grafico-principal__periodo">{new Date().getFullYear()}</span>
      </div>
      <div class="grafico-principal__lienzo">
        <canvas ref={canvasRef} id="grafico-cashflow"></canvas>
      </div>
    </section>
  );
}
