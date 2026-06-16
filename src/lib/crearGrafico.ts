import Chart from 'chart.js/auto';

interface GraficoData {
  labels: string[];
  ingresos: number[];
  gastos: number[];
}

export function crearGrafico(
  canvasId: string,
  data: GraficoData
): Chart | null {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
  if (!canvas) return null;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const gradientIngresos = ctx.createLinearGradient(0, 0, 0, 240);
  gradientIngresos.addColorStop(0, 'rgba(0, 255, 136, 0.15)');
  gradientIngresos.addColorStop(1, 'rgba(0, 255, 136, 0)');

  const gradientGastos = ctx.createLinearGradient(0, 0, 0, 240);
  gradientGastos.addColorStop(0, 'rgba(255, 68, 102, 0.15)');
  gradientGastos.addColorStop(1, 'rgba(255, 68, 102, 0)');

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: 'Ingresos',
          data: data.ingresos,
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
          data: data.gastos,
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
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(14, 20, 23, 0.9)',
          titleFont: {
            family: 'Geist',
            weight: 500,
          },
          bodyFont: {
            family: 'Geist Mono',
            weight: 400,
          },
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
          grid: {
            display: false,
          },
          ticks: {
            font: {
              family: 'Geist',
              weight: 400,
              size: 11,
            },
            color: 'rgba(255,255,255,0.25)',
            maxRotation: 0,
          },
        },
        y: {
          display: true,
          grid: {
            color: 'rgba(255,255,255,0.03)',
          },
          ticks: {
            font: {
              family: 'Geist Mono',
              weight: 400,
              size: 11,
            },
            color: 'rgba(255,255,255,0.25)',
            padding: 8,
            callback: (value: string | number) => {
              const num = typeof value === 'number' ? value : Number(value);
              if (num >= 1000) {
                return '$' + (num / 1000).toFixed(0) + 'k';
              }
              return '$' + num;
            },
          },
          beginAtZero: true,
        },
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
    },
  });
}
