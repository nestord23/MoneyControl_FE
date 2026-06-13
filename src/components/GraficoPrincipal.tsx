import { useEffect, useRef } from 'preact/hooks';
import Chart from 'chart.js/auto';

const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export default function GraficoPrincipal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: meses,
        datasets: [
          {
            label: 'Ingresos',
            data: [28500, 31200, 29800, 33400, 35200, 38100, 36500, 39200, 41800, 40500, 43200, 48250],
            borderColor: '#00ff88',
            backgroundColor: gradientIngresos,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: '#00ff88',
            pointHoverBorderColor: '#00ff88',
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Gastos',
            data: [22100, 19800, 23400, 24500, 21200, 25600, 27800, 24100, 26800, 29100, 27500, 32180],
            borderColor: '#ff4466',
            backgroundColor: gradientGastos,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: '#ff4466',
            pointHoverBorderColor: '#ff4466',
            fill: true,
            tension: 0.4,
          },
        ],
      },
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
  }, []);

  return (
    <section class="grafico-principal">
      <div class="grafico-principal__encabezado">
        <h2 class="grafico-principal__titulo">Cash Flow Analysis</h2>
        <span class="grafico-principal__periodo">2026</span>
      </div>
      <div class="grafico-principal__lienzo">
        <canvas ref={canvasRef} id="grafico-cashflow"></canvas>
      </div>
    </section>
  );
}
