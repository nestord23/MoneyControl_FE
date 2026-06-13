export default function GraficoPulso() {
  return (
    <div class="grafico-pulso">
      <div class="grafico-pulso__encabezado">
        <span class="grafico-pulso__titulo">Spending Pulse</span>
        <span class="grafico-pulso__vivo">● LIVE</span>
      </div>
      <div class="grafico-pulso__lienzo">
        <svg viewBox="0 0 280 80" preserveAspectRatio="none" class="grafico-pulso__svg">
          <defs>
            <linearGradient id="pulso-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="rgba(0, 210, 255, 0)" />
              <stop offset="80%" stop-color="rgba(0, 210, 255, 0.15)" />
              <stop offset="100%" stop-color="rgba(0, 210, 255, 0.4)" />
            </linearGradient>
          </defs>
          <path class="grafico-pulso__linea" d="M0,60 Q20,65 40,55 T80,50 T120,45 T160,30 T200,35 T240,20 T280,25" fill="none" stroke="var(--color-primary)" stroke-width="1.5" />
          <path class="grafico-pulso__relleno" d="M0,60 Q20,65 40,55 T80,50 T120,45 T160,30 T200,35 T240,20 T280,25 L280,80 L0,80 Z" fill="url(#pulso-grad)" />
          <circle class="grafico-pulso__punto" cx="280" cy="25" r="2.5" fill="var(--color-primary)" />
          <circle class="grafico-pulso__pulso" cx="280" cy="25" r="6" fill="none" stroke="var(--color-primary)" stroke-width="1" />
        </svg>
      </div>
    </div>
  );
}
