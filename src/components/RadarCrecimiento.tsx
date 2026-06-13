export default function RadarCrecimiento() {
  const progreso = 75;
  const offset = 226 - (226 * progreso) / 100;

  return (
    <div class="radar-crecimiento">
      <div class="radar-crecimiento__encabezado">
        <span class="radar-crecimiento__titulo">Income vs Target</span>
        <span class="radar-crecimiento__porcentaje">{progreso}%</span>
      </div>
      <div class="radar-crecimiento__lienzo">
        <svg class="radar-crecimiento__svg" viewBox="0 0 180 110">
          <path class="radar-crecimiento__arco-base" d="M 20 95 A 70 70 0 0 1 160 95" />
          <path class="radar-crecimiento__arco-progreso" d="M 20 95 A 70 70 0 0 1 160 95" stroke-dasharray="226" stroke-dashoffset={offset} />
          <text class="radar-crecimiento__etiqueta-valor" x="90" y="75" text-anchor="middle" dominant-baseline="middle">$371k</text>
          <text class="radar-crecimiento__etiqueta-meta" x="90" y="95" text-anchor="middle">Meta: $495k</text>
        </svg>
      </div>
    </div>
  );
}
