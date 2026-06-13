interface Props {
  etiqueta: string;
  valor: string;
  variante: 'fixed' | 'variable' | 'total';
}

export default function TarjetaResumen({ etiqueta, valor, variante }: Props) {
  return (
    <div class={`tarjeta-resumen${variante === 'total' ? ' tarjeta-resumen--total' : ''}`}>
      <span class="tarjeta-resumen__etiqueta">{etiqueta}</span>
      <span class={`tarjeta-resumen__valor tarjeta-resumen__valor--${variante}`}>
        {valor}
      </span>
    </div>
  );
}
