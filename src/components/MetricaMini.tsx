interface Props {
  etiqueta: string;
  valor: string;
  variacion: string;
  positiva: boolean;
}

export default function MetricaMini({ etiqueta, valor, variacion, positiva }: Props) {
  return (
    <div class="metrica-mini">
      <span class="metrica-mini__etiqueta">{etiqueta}</span>
      <span class="metrica-mini__valor">{valor}</span>
      <span class={`metrica-mini__variacion metrica-mini__variacion--${positiva ? 'positiva' : 'negativa'}`}>
        {variacion}
      </span>
    </div>
  );
}
